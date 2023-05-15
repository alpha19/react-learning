import './App.css';

import { useState, useEffect, useRef } from "react";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

function getFoods(callback) {
  return fetch(`${process.env.REACT_APP_API_URL}/food`, {
    accept: 'application/json',
  })
  .then(checkStatus)
  .then(response => response.json())
  .then(callback);
}

const Food = ({ food }) => {
  return (
    <tr>
        <td>{food.description}</td>
        <td>{food.kcal}</td>
        <td>{food.protein_g}</td>
        <td>{food.fat_g}</td>
        <td>{food.carbohydrate_g}</td>
    </tr>
  );
}

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  let search = useRef('');
  let allFoods = useRef([]);

  useEffect(() => {
    getFoods(foods => {
      allFoods.current = foods;
      filterFoods();
    });
  },[]);

  const filterFoods = () => {
    if (search.current === '')  {
      setFoods(allFoods.current);
    } else {
      setFoods(allFoods.current.filter(food => food.description.includes(search.current)));
    }
  };

  const handleSearchChange = (e) => {
    search.current = e.target.value; // Might be unnecessary
    filterFoods();
  }
  const foodRows = foods.map((food, key) => {
      return <Food food={food} key={key} />
  });

  return (
    <>
      <h1>List of Food</h1>
      <table>
        <thead>
          <tr>
            <th colSpan='5'>
              <input
                type='text'
                placeholder='Search foods...'
                value={search.current}
                onChange={handleSearchChange}
              />
            </th>
          </tr>
          <tr>
            <th>Description</th>
            <th>Kcal</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Carbs (g)</th>
          </tr>
        </thead>
        <tbody>
          {foodRows}
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  return (
    <div className='App'>
      <FoodList />
    </div>
  );
}

export default App;
