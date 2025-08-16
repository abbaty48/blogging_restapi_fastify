import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
	app
		.get("/posts/:id?", async (request, reply) => {})
		.post(
			"/posts",
			{ schema: { $ref: "schema:blog:post" } },
			async (request, _reply) => {
				try {
					const now = new Date(Date.now());
					const { title, content, category, tags } = request.body;
					const connection = await app.mysql.getConnection();
					const [insertId] = await connection.query(
						`INSERT INTO posts(title, content, category, tags, createdAt, updatedAT) VALUES (?, ?, ?, ?, ?, ?);`,
						[title, content, category, tags, now, now],
					);
					connection.release();
					return insertId
						? {
								title,
								content,
								category,
								tags: tags.split(","),
								createdAt: now,
								updatedAt: now,
							}
						: false;
				} catch (error) {
					return {
						message:
							error?.message || "I'm sorry, failed to insert a new post.",
					};
				}
			},
		)
		.put("/posts/:id", async (request, reply) => {})
		.delete("/post/:id", async (request, reply) => {});
});
