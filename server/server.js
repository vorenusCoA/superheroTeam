const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors")

app.use(cors());
app.use("/api", require("./routes/rutas"));
app.use(express.json());

app.use("/", express.static("../client/dist/superHeroTeam"));

app.listen(port, function () {
    console.log(`Example app listening at port:${port}`)
});