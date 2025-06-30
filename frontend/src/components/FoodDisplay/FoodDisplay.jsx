import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContex';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ catagory }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {
          food_list.map((item, index) => {
            if (
              catagory.toLowerCase() === "all" ||
              item.catagory?.toLowerCase() === catagory.toLowerCase()
            ) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
