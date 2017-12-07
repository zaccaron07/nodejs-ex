module.exports = app => {
	app.get("/", (req, res) => {
		res.json({status: "App controle trabalho OK!"});
	})
}