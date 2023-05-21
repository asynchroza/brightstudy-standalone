# brightstudy-standalone

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
