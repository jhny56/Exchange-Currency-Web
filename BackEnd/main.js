const express = require("express"); //module
const app = express(); //app in the module
app.use(express.json()); //parse the json string back to object

const cors = require("cors");
app.use(cors());

const userRoutes = require("./routes/user.routes");
userRoutes.setRoutes(app);

app.listen(3001);
