## Prerequisites
1. Install [Node.js](https://nodejs.org)
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i`

## Run
### Development mode
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod`: run the project with a production bundle listening at [localhost:3000](http://localhost:3000) 

## Running tests
Run `npm test` to execute the frontend unit tests via [Karma](https://karma-runner.github.io).
