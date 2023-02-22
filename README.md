# Task Codica

## Prerequisites
- node.js
- npm package manager
- git
- docker


## Installation
Clone this repository and install node modules
```sh
$ git clone https://github.com/YuriiKalnytskyi/Codica.git
$ cd Codica
$ npm install
```

install node modules BE
```sh
$ cd packages/backend
$ npm install
```

## To run the entire project, you need to return to the main folder and run the script

### `npm run start:local`

Docker must be running or sudo must be added in packages/local-db in package.json

In the project directory, you can run:
### `npm run format:check`

Checks the software code for compliance with the specified standards

### `npm run format:fix`

Gives the program code of the specified standards

### `npm run lint:check`

Checks the software code for compliance with the specified standards
