import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);

  const normalizedQuery = searchQuery ? searchQuery.trim().toLowerCase() : "";

  const filtered = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const name = (item.name || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    return name.includes(normalizedQuery) || desc.includes(normalizedQuery);
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filtered.map((item, index) => (
          <FoodItem
            key={item._id || index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
