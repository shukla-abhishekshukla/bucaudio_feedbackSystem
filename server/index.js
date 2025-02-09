import express from "express"
import user from './user.js';



const app = express()

app.get("/",(req,res)=>{
    res.send("Server is ready")

})

app.get("/api/users",(req, res)=>{
    res.send(users)

})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server at http:..localhost:${port}`)
})

