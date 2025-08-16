import fastifyPlugin from "fastify-plugin";
import blogPostSchema from "../schemas/blogs/post.schema.json" with {
	type: "json",
};

export default fastifyPlugin(async function schemaPlugin(app) {
	app.addSchema(blogPostSchema);
});
