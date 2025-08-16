import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
	app
		.get(
			"/posts/:id?",
			{
				schema: { $ref: "schema:blog:get" },
			},
			async (request, _reply) => {
				try {
					const { id } = request.params;
					const { title, content, category, tags } = request.query;

					const { getConnection, escape, query } = app.mysql;
					const connection = await getConnection();

					console.log("Q: ", title, content, category, tags);
					let whereClause = "";
					title ? (whereClause += `title=${escape(title)}&&`) : "";
					content ? (whereClause += `content=${escape(content)}&&`) : "";
					category ? (whereClause += `category=${escape(category)}&&`) : "";
					tags
						? (whereClause += `FIND_IN_SET('tags', ${escape(tags)}) > 0`)
						: "";

					let qs = id
						? `SELECT * FROM posts WHERE id = ${escape(id)}`
						: `SELECT * FROM posts WHERE ${whereClause.replace(/&&$/, "")}`;

					const [rows] = await query(qs);
					connection.release();

					return { rows };
				} catch (error) {
					return {
						message: error?.message || "Opps, I'm sorry, something went wrong.",
					};
				}
			},
		)
		.post(
			"/posts",
			{ schema: { $ref: "schema:blog:post" } },
			async (request, _reply) => {
				try {
					const now = new Date(Date.now());
					const { title, content, category, tags } = request.body;
					const connection = await app.mysql.getConnection();
					const [insertId] = await connection.query(
						`INSERT INTO posts(title, content, category, tags, createdAt, updatedAT) VALUES(?, ?, ?, ?, ?, ?); `,
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
		.put(
			"/posts/:id",
			{ schema: { $ref: "schema:blog:put" } },
			async (request, _reply) => {
				const { id } = request.params;
				const { getConnection, query } = app.mysql;
				const connection = await getConnection();
				let [rows] = await query(`SELECT * FROM posts WHERE id = ?`, [id]);

				if (rows.length) {
					const { title, content, category, tags } = Object.assign(
						rows[0],
						request.body,
					);
					const updatedAt = new Date(Date.now());
					const [result] = await query(
						"UPDATE posts SET title =?, content = ?, category = ?, tags = ?, updatedAt = ?",
						[title, content, category, tags, updatedAt],
					);

					const { affectedRows, changedRows } = result;
					await connection.release();
					return affectedRows && changedRows
						? { title, content, category, tags, updatedAt }
						: false;
				}

				return {
					message:
						"Opps, a post with that id does not exist, please check and try again.",
				};
			},
		)
		.delete("/post/:id", async (request, reply) => {});
});
