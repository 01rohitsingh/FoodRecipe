const express=require ("express")
const app =express();
const dotenv=require("dotenv").config()

const connectDb=require("./config/connectionDb")

const PORT=process.env.PORT || 3000

app.use(express.json())


app.use("/recipe",require("./routes/recipe"))

connectDb()

app.listen(PORT,(err)=>{
  console.log(`Server is running at ${PORT}`)
})

