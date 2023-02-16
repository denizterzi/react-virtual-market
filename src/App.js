// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
// import Products from './components/Products/ProductCard.tsx';
// import ProductList from './components/Products/ProductList';
// import Categories from './components/Products/Categories/Categories';
import ProductPageComponent from './components/Products/ProductPageComponent';
// const productList1 = [];
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// const demo = () => {
//   return productList1.map((x) => 
//     <Products title = {x} subheader={x}></Products>
//   )
// };
import Paper from '@mui/material/Paper';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import { Routes, Route, useNavigate  } from "react-router-dom";
import Basket from './components/Basket/Basket';

function App() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate ();

  const onChange = (event, newValue) => {
    setValue(newValue);
    // navigate('/basket');
  }

  return (
    <div className="App">
     {/* <BrowserRouter> */}
      <Routes>
          <Route path="/" element={<ProductPageComponent />} />
          <Route path="basket" element={<Basket />} />
      </Routes>
    {/* </BrowserRouter> */}


    {/* <ProductPageComponent/> */}
      {/* <Categories />
      <ProductList/> */}
      {/* <Products></Products> */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={onChange}
        >
          <BottomNavigationAction onClick={() => navigate('/')} label="Products" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction onClick={() => navigate('/basket')} label="Basket" icon={<ShoppingCartOutlinedIcon />} />
          <BottomNavigationAction label="Scan QR" icon={<QrCodeScannerOutlinedIcon />} />
        </BottomNavigation>
      </Paper>
      
    </div>
  );
}

export default App;
