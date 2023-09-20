import "reflect-metadata";
import { Elysia } from 'elysia';
import { yoga } from '@elysiajs/graphql-yoga';
import { ApplicationEventListeners } from "./application/events/application.event.listeners";
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const typeDefs = loadFilesSync(path.join(import.meta.dir, '.'), { extensions: ['graphql'], recursive: true });
const resolvers = loadFilesSync(path.join(import.meta.dir, './**/*.resolver.*'), { recursive: true });

const app = new Elysia({ prefix: "/talent-trail/api" })
    .decorate('listeners', () => new ApplicationEventListeners())
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
