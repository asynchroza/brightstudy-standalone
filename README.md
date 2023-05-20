# brightstudy-standalone

This is the containerized standalone which is being hosted for universities under different subdomains (e.g. `aubg.brightstudy.com`). Each university has their own portal, which is hosted on a virtual machine situated in close proximity to their physical location.

## Running the project

### Prerequisites:

- You need [turbo repo](https://turbo.build/repo/docs/installing) installed
- `turbo install:all` to install all project dependencies (equivalent to `yarn install` in root directory and `yarn install` in `/api` directory)

### Commands:

Client:

- **Start the client** - `turbo dev` (`yarn dev`)

Server:

- **Start the server** - `turbo server` (which will actually run `yarn server` within the `/api` directory)

Database:

- **Start the database container** - `turbo db` (`yarn db` within the `/api` directory)
- **Migrate the database schema** - `turbo db:migrate` (`yarn db:migrate` within the `/api` directory)
- **Seed the database** - `turbo db:seed` (`yarn db:seed` within the `/api` directory)
- **Explore data in Prisma studio** - `turbo db:studio` (`yarn db:studio` within the `/api` directory)
