const dotenv=require("dotenv").config()
const express=require ("express")
const app =express();

const cors=require("cors")
const connectDb=require("./config/connectionDb")

const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/recipe",require("./routes/recipe"))
app.use("/recipe",require("./routes/user"))
connectDb()

app.listen(PORT,(err)=>{
  console.log(`Server is running at ${PORT}`)
})

