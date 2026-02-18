import express from 'express'
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors())
const port = 5000; //always store in .env
app.listen(port,()=>{
    console.log(`server is running on the http://localhost:${port}`)
})