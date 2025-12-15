const Recipes = require("../models/recipe")

// how to add image using  Multer 
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})
const upload = multer({ storage: storage })


const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();
  return res.json(recipes)
};

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id)
  return res.json(recipe)
};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time, } = req.body;

  if (!title || !ingredients || !instructions)
    return res.json({
      message: "Require fields cant empty"
    })

  const newRecipe = await Recipes.create({ title, ingredients, instructions, time })

  return res.json(newRecipe)

};

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;


  let recipe = await Recipes.findById(req.params.id)
  try {
    if (recipe) {
      await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.json({ title, ingredients, instructions, time })
    }
  }
  catch (err) {
    return res.status(400).json({ message: "err" })
  }
}

const updateRecipe = (req, res) => {
  res.json({ message: "hello" })
}

const deleteRecipe = async(req, res) => {
  const recipe=await Recipes.findById(req.params.id)
  try{
    if(recipe){
      await Recipes.findByIdAndDelete(req.params.id)
      return res.json({meassage:"succesfull  deleted"})
    }
  }
  catch(err){
    res.json({message:"err"})
  }
}


module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, updateRecipe, deleteRecipe, upload }