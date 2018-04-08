# xiaoyaoji-mock-server

The tool is designed to get you up and running with a mocker server for xiaoyaoji.

## Requirements
* node `>=7.6.0.`
* npm `>=5.6.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can follow these steps to get the project up and running:

```bash
$ git clone <url>
$ cd xiaoyaoji-mock-server
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```

Then visit [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

## Profile

The structure of 'profile.json' file is shown below.

```javascript
{
  "host": "",                    // xiaoyaoji host, such as 'http://api.com/'
  "projectId": "",               // project's id
  "token": "",                   // find in your browser's storage
  "inject": {                    // can custom some api here
    "<custom url>": {
      "code": 1,
      "errmsg": "我是被注入的"
    }
  },
  "dict": {                      // get with selected dict field
    "<field name>": ["1", "2"]
  }
}
```

## Usage

### Use `xiaoyaoji-mock-server` in current project

Installation:

```bash
npm install --save-dev xiaoyaoji-mock-server
```

Then, add `mock` to [npm scripts](https://docs.npmjs.com/misc/scripts):

```json
{
  "scripts": {
    "mock": "xiaoyaoji-mock-server --file=<profile path>"
  }
}
```

**Note:** please make sure that `profile` exists.

Now, just run `npm run mock`.


## Documentation

### CLI

We can install `xiaoyaoji-mock-server` as a cli command and explore what it can do by `xiaoyaoji-mock-server -h`. However, the recommended way to use `xiaoyaoji-mock-server` is to install it as `devDependencies`.

```bash
$ npm install -g xiaoyaoji-mock-server
$ xiaoyaoji-mock-server -h
  Usage: xiaoyaoji-mock-server [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --file <path>    specify path of profile, defaults to [./profile.json]
    -p, --port [number]  set server port, defaults to [5000]
    -pf, --prefix [prefix]', 'prefix placeholder array, split by \',\'', defaults to ['$prefix$']
```

#### port: Number

> default: 5000

To set the port which will be listened when we start a local server.

#### file: String

> default: './profile.json'

To set profile path.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Attention: The host must be specified!

## Todos

- ~~mock api~~
- ~~inject, dict~~
- show api list
- auto test
- xiaoyaoji api definition validator
- multiple project support
