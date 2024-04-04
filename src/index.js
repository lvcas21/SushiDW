import app from "./app.js";
import { connectdb } from './db.js'


connectdb();
app.listen(4000)
console.log('server port', 4000);