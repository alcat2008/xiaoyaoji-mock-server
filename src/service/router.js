const fs = require('fs')
const request = require('request')
const Router = require('koa-router')
const { mockResponse } = require('./mock')

function getProjectData(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // console.log(JSON.stringify(body))
        resolve(body)
      } else {
        console.log(JSON.stringify(error))
        reject(error)
      }
    })
  })
}

async function genRouter(profile, prefixs) {
  const router = new Router()

  console.log('profile: ' + profile)
  const profileData = JSON.parse(fs.readFileSync(profile))
  const apiUrl = `${profileData.host}api/project/${profileData.projectId}.json?token=${profileData.token}`
  console.log('apiUrl: ' + apiUrl)

  const projectData = JSON.parse(await getProjectData(apiUrl))
  // console.log('projectData: ' + projectData)

  projectData.data.modules.forEach(module => {
    console.log('******      ' + module.name + '      ****** Start')
    module.folders.forEach(folder => {
      console.log('   ###      ' + folder.name + '      ### Start')
      folder.children.forEach(child => {
        const url = prefixs
          .reduce((a, c) => a.replace(c, '/api'), child.url)
          .replace('/api/api', '/api')

        console.log('      ' + child.name + ' ===> ' + url)
        router.all(url, async (ctx, next) => {
          // ctx.router available
          // await next()
          if (profileData.inject[url]) {
            ctx.body = profileData.inject[url]
          } else {
            ctx.body = mockResponse(JSON.parse(child.responseArgs), profileData.dict)
          }
        })
      })
      console.log('   ###      ' + folder.name + '      ### End')
    })
    console.log('******      ' + module.name + '      ****** End')
  })

  return router
}

module.exports = { genRouter }
