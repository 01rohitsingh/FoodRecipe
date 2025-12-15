import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import foodImg from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isMyRecipePage = location.pathname === "/myRecipe";

  const favItems = JSON.parse(localStorage.getItem("fav")) || [];

  useEffect(() => {
    setAllRecipes(recipes || []);
  }, [recipes]);

  // DELETE RECIPE
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAllRecipes((prev) => prev.filter((r) => r._id !== id));

      const updatedFav = favItems.filter((r) => r._id !== id);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ADD / REMOVE FAVOURITE
  const favRecipe = (item) => {
    const exists = favItems.some((r) => r._id === item._id);

    const updatedFav = exists
      ? favItems.filter((r) => r._id !== item._id)
      : [...favItems, item];

    localStorage.setItem("fav", JSON.stringify(updatedFav));
    setAllRecipes([...allRecipes]); // force re-render
  };

  return (
    <div className="card-container">
      {allRecipes.map((item) => (
        <div
          key={item._id}
          className="card"
          onDoubleClick={() => navigate(`/recipe/${item._id}`)}
        >
          {/* IMAGE */}
          <img
            src={
              item.coverImage
                ? `http://localhost:5000/images/${item.coverImage}`
                : foodImg
            }
            width="120"
            height="100"
            alt={item.title}
          />

          <div className="card-body">
            <div className="title">{item.title}</div>

            <div className="icons">
              <div className="timer">
                <BsStopwatchFill /> {item.time}
              </div>

              {!isMyRecipePage ? (
                <FaHeart
                  onClick={() => favRecipe(item)}
                  style={{
                    color: favItems.some((r) => r._id === item._id)
                      ? "red"
                      : "",
                  }}
                />
              ) : (
                <div className="action">
                  <Link to={`/editRecipe/${item._id}`} className="editIcon">
                    <FaEdit />
                  </Link>
                  <MdDelete
                    className="deleteIcon"
                    onClick={() => onDelete(item._id)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
