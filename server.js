const http = require("http");
const app = require("./app");
const db =  require('./backend/models/init');
const init = require('./backend/init');
require("dotenv").config();


db.sync()
.then(()=>{
    init.initRoles()
    .then (init.initAdmin)
})



app.set("port", process.env.SERVER_PORT);
const server = http.createServer(app);
server.listen(process.env.SERVER_PORT, (req, res) => {
    console.log("URL server : http://localhost:" + process.env.SERVER_PORT);
});
