const express= require("express")
const {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe, upload}=require("../controller/recipe")
  
const router=express.Router()

router.get("/",getRecipes) //get all recipes
router.get("/:id",getRecipe) //get recipes by id
router.post("/",upload.single('file'),addRecipe) // add recipe
router.put("/:id",editRecipe) // Edit recipe
router.delete("/:id",deleteRecipe) //delete recipe
 
module.exports=router