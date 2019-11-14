const express = require("express");

const app = express();

const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => {
	res.json({ msg: "test" });
});

app.use("/api", apiRouter);
app.listen(8080, () => {
	console.log(`Express Runing in port 8080`);
});
