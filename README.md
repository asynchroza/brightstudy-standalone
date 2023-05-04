# brightstudy-standalone
This is the containerized standalone which is being hosted for universities under different subdomains (e.g. `aubg.brightstudy.com`). Each university has their own portal, which is hosted on a virtual machine situated in close proximity to their physical location.

## Getting started
### Prerequisites:
* Install [Yarn](https://classic.yarnpkg.com/en/) & run `yarn install`
* Install pre-commit hooks by running `yarn prepare`

### Commands:
* `yarn dev` to NextJS on [localhost:3000](localhost:3000)
* `yarn test` to run all tests