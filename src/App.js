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

const getProducts = (callback) => {
  fetch(`${process.env.REACT_APP_API_URL}/food`, {
    accept: 'application/json',
  })
  .then(checkStatus)
  .then(response => response.json())
  .then(callback);
}

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

const ProductRow = ({ product }) => {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const ProductTable = ({ products, filterText, inStockOnly }) => {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {

    if ((!inStockOnly || product.stocked) &&
        (filterText === "" || product.name.toUpperCase().includes(filterText.toUpperCase())))
    {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }

      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    }
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const SearchBar = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) => {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={ (e) => onFilterTextChange(e.target.value) } />
      <label>
        <input
          type="checkbox"
          onClick={ (e) => onInStockOnlyChange(e.value) } />
        Only show products in stock
      </label>
    </form>
  );
}

const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(queriedProducts => setProducts(queriedProducts));
  },[]);


  return <FilterableProductTable products={products} />;
}

export default App;
