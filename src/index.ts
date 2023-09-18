import "reflect-metadata";
import { Elysia } from 'elysia';
import { yoga } from '@elysiajs/graphql-yoga';
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const typeDefs = loadFilesSync(path.join(import.meta.dir, '.'), { extensions: ['graphql'], recursive: true })
const resolvers = loadFilesSync(path.join(import.meta.dir, './**/*.resolver.*'), { recursive: true })

const app = new Elysia({ prefix: "/talent-trail/api" })
    .use(
        yoga({
            typeDefs,
            resolvers
        })
    )
    .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
