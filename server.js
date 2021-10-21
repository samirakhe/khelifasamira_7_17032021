const http = require("http");
const app = require("./app");
const db =  require('./backend/models/init');
const init = require('./backend/init');


//db.sync();

init.initRoles();
init.initAdmin();
app.set("port", 3001);
const server = http.createServer(app);
server.listen(3001, (req, res) => {
    console.log("URL server : http://localhost:" + 3001);
});
