# Blogging API

> A Blog rest api built with Fastify, this project is written in JavaScript
> for post blogging.

## How to run

- clone and cd into the project.
- Open the project in the terminal.
- `npm install` to install the project dependencies.
- `npm start` to start the project.
- `npm start:dev` to start the project in develpment mode.

### Dependencies

- fastify
- [fastify] <https://github.com/fastify>
  > for plugin encapsulation.
- [fastify-plugin] <https://github.com/davidedantonio/fastify-axios>
- > for database store with mysql
- [@fastify/mysql] <https://github.com/davidedantonio/fastify-axios>

### EndPoints

METHOD | URL

---

GET | <http://localhost:3000/posts>
GET | <http://localhost:3000/posts/id>
GET | <http://location:3000/posts?title&content&category&tags>
PUT | <http://localhost:3000/posts/id>
DELETE | <http://location:3000/posts/id>

#### Database Query

`
CREATE DATABASE IF NOT EXISTS blogisfy;

CREATE TABLE IF NOT EXISTS `posts`(
id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
title varchar(40) NOT NULL,
content varchar(1000) NOT NULL,
category varchar(15) NOT NULL,
tags varchar(255) NOT NULL,
createdAt datetime NOT NULL DEFAULT now(),
updatedAt datetime NOT NULL DEFAULT now()
);
`
