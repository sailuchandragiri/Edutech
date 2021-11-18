const app = require('./index')

const connect = require("./configs/db");


app.listen(3001, async (req, res) => {
    await connect();
    console.log("Express is listening on port: 3001")
})