const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require('cors');

const express = require('express')
const connectDB = require('./DB/connection.js');

const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
const port = 8000;
app.use("/auth", require("./routers/authRouter"));
app.use("/users", require('./routers/userRouter'));
app.use("/cities", require("./routers/cityRouter"));
app.use("/orders", require("./routers/orderRouter"));

connectDB();


app.get('/', async (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
}); 