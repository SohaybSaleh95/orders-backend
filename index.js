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
app.use("/auth", require("./routers/userRouter"));

connectDB();


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
}); 