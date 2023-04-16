import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Products = ()=> {
  const { products } = useSelector(state => state);
  const [name, setName] = useState('')
  const [foundProducts, setFoundProducts] = useState(products)

  const filterByName = (ev) => {
    const keyword = ev.target.value
    if (keyword) {
      const results = products.filter(product => {
        return product.name.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFoundProducts(results)
    }
    else {
      setFoundProducts(products)
    }
    setName(keyword)
  }

  const filterByStockStatus = (ev) => {
    if (ev.target.checked === true) {
      setFoundProducts(
        products.filter(product => product.inStock === true)
      )
    }
    else {
      setFoundProducts(products)
    }
  }

  return (
    <div>
      <form>
        <input 
          type='search'
          value = {name}
          onChange = {filterByName}
          placeholder = 'search by name'
        />
        <label>in stock only<input type = 'checkbox' onChange = {filterByStockStatus} /></label>
      </form>
      <ul>
        { foundProducts && foundProducts.length > 0 ? (
          foundProducts.map( product => {
            return (
              <li key={ product.id }>
                { product.name }
                { !!product.inStock && <em> is in stock</em>}
              </li>
            );
          })
        ) : (
          products.map(product => {
            return (
              <li key={ product.id }>
                { product.name }
                { !!product.inStock && <em> is in stock</em>}
              </li>
            );
          })
        )
        }
      </ul>
    </div>
  );
};

export default Products;
