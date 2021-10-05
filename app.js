const express = require("express")
const cors = require("cors")
const serveStatic = require("serve-static")
const path = require('path');
const route = require("./routes")

const app = express()
app.use(serveStatic(path.join(__dirname, 'dist')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

corsOptions = {
    origin: 'https://blue-force.herokuapp.com/',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome on board")
})
require("./routes")(app)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})