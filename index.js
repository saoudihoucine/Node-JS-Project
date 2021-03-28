const film_router = require("../DS/routers/film");
const seance_router = require("../DS/routers/seance");
const express = require("express");
const db = require("../DS/db");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/film",film_router);
app.use("/api/seance",seance_router);



app.listen(port,()=>console.log(`server is running on ${port} ...`));