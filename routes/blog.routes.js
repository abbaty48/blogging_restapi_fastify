import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
	app
		.get("/posts/:id?", async (request, reply) => {})
		.post("/posts", async (request, reply) => {})
		.put("/posts/:id", async (request, reply) => {})
		.delete("/post/:id", async (request, reply) => {});
});
