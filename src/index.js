const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRouter = require("./routes/index");

const db = require("./models/index");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server started on PORT`, PORT);

    if (process.env.DB_SYNC) {
        db.sequelize.sync({ alter: true });
    }
});
