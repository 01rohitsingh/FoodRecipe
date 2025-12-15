import React from 'react'
import food from '../assets/foodRecipe.png'
import { useLoaderData } from 'react-router-dom'

export default function RecipeDetails() {
  const recipe = useLoaderData()

  return (
    <div className='outer-container'>

      <div className='profile'>
        <img src={food} width="50px" height="50px" />
        <h5>{recipe.email}</h5>
      </div>

      <h3 className='title'>{recipe.title}</h3>

      <img
        src={`http://localhost:5000/images/${recipe.coverImage}`} // ✅ FIXED
        width="220px"
        height="200px"
      />

      <div className='recipe-details'>
        <div className='ingredients'>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className='instructions'>
          <h4>Instructions</h4>
          <span>{recipe.instructions}</span>
        </div>
      </div>
    </div>
  )
}
