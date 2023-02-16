// import Products from './components/Products/ProductCard.tsx';
import ProductList from './ProductList';
import Categories from './Categories/Categories';
import React, {useState} from 'react';

function ProductPageComponent() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };  


  return (
      <div>
        <Categories value={value} handleChange={handleChange}/>
        <ProductList handleChange={handleChange}/>
      </div>
  );
}

export default ProductPageComponent;
