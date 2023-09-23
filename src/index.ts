import "reflect-metadata";
import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import { PrismaClient } from "@prisma/client";
import Container from "typedi";
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");

const prisma = new PrismaClient();
Container.set("prisma", prisma);

const typeDefs = loadFilesSync(path.join(import.meta.dir, "."), {
  extensions: ["graphql"],
  recursive: true,
});
const resolvers = loadFilesSync(
  path.join(import.meta.dir, "./**/*.resolver.*"),
  { recursive: true }
);

const app = new Elysia({ prefix: "/talent-trail/api" })
  .use(
    yoga({
      typeDefs,
      resolvers,
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
