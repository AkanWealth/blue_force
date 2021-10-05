const express = require("express")
const cors = require("cors")
const serveStatic = require("serve-static")
const path = require('path');

const app = express()
app.use(serveStatic(path.join(__dirname, 'dist')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
    origin: 'https://blue-force.herokuapp.com/',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors());

// corsOptions = {
//     origin: 'https://blue-force.herokuapp.com/',
//     optionsSuccessStatus: 200,
//     credentials: true,
// }
app.use(function(req, res, next) {
    // Website you wish to allow to connect (CORS)
    res.setHeader('Access-Control-Allow-Origin', 'https://blue-force.herokuapp.com/');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome on board")
})
require("./routes")(app)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})