## Install the app

```bash
# install nest
pnpm i -g @nestjs/cli

# create nest app
nest new project_name

# some dependence we need
pnpm i @nestjs/graphql @nestjs/config @nestjs/apollo @nestjs/jwt @nestjs/passport passport-jwt graphql  apollo-server-express @apollo/server class-validator class-transformer

# install prisma orm
pnpm install prisma --save-dev
pnpm i @prisma/client

# init prisma in app
npx prisma init

# install prisma client
pnpm install @prisma/client

# generate prsima schema
npx prisma generate

# init a new service
nest g service service_name

# init a resource
nest g resource resource_name

# init a new module
nest g module module_name
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
