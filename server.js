const http = require("http");
const app = require("./app");
const db =  require('./backend/models/init');
const init = require('./backend/init');


//db.sync();

init.initRoles();
init.initAdmin();
app.set("port", 3000);
const server = http.createServer(app);
server.listen(3000, (req, res) => {
    console.log("URL server : http://localhost:" + 3000);
});
