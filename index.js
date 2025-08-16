import Fastify from "fastify";
import fastifyMysql from "@fastify/mysql";
import serverConfig from "./configs/server.config.js";
import blogRoutes from "./routes/blog.routes.js";
import schemasPlugin from "./plugins/schemas.plugin.js";

const fastify = Fastify(serverConfig);

fastify
	.register(fastifyMysql, {
		promise: true,
		connectionString: "mysql://root:password@localhost:3306/blogify",
	})
	.register(schemasPlugin)
	.register(blogRoutes)
	.after((error) => {
		if (error) {
			fastify.log.warn(
				`It seems like one of the plugins has a message for you: ${error?.message}`,
			);
		}
	});

await fastify.listen({ port: 3000 });
