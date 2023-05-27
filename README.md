# brightstudy-standalone

[![API Unit Tests](https://github.com/asynchroza/brightstudy-standalone/actions/workflows/api-unit-tests.yaml/badge.svg)](https://github.com/asynchroza/brightstudy-standalone/actions/workflows/api-unit-tests.yaml)

This is the containerized standalone which is being hosted for universities under different
subdomains (e.g. `aubg.brightstudy.com`). Each university has their own portal, which is hosted on a
virtual machine situated in close proximity to their physical location.

## Running the project

### Prerequisites:

- `yarn install:all` to install all project dependencies (equivalent to `yarn install` in root
  directory and `yarn install` in `/api` directory)

### Commands:

Client:

- **Start the client** - `yarn dev` (in root directory)

Server:

- **Start the server** - `yarn server` (in root directory or in the `/api` directory)

Database:

- **Start the database container** - `yarn db:start` (in root directory or in the `/api` directory)
- **Migrate the database schema** - `yarn db:migrate` (in root directory or in the `/api` directory)
- **Seed the database** - `yarn db:seed` (in root directory or in the `/api` directory)
- **Explore data in Prisma studio** - `yarn db:studio` (in root directory or in the `/api`
  directory)

### HOW-TOs:

Login using GQL sandbox:

```graphql
mutation Login($email: String!, $password: String) {
	login(email: $email, password: $password)
}
```

**NB!** You will need to pass the token generated upon login in an **Authorization** header in order
to be able to see schemas and do queries.

## Controlled Pages Workflow

### Portal Initialization

During the initial deployment, clients will receive an admin account. This account should be used
for the first login into the portal. The login process for the initial login is handled through the
`/initialLogin` endpoint. Upon successful login, the user will be directed to the administration
panel.

The admin account is responsible for creating new admin accounts that will be used by the
university's admins.

For all subsequent logins, users should use the `/login` endpoint.
