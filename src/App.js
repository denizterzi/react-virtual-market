import './App.css';
import React, {useState, useEffect} from 'react';
import ProductPageComponent from './components/Products/ProductPageComponent';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Paper from '@mui/material/Paper';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import { Routes, Route, useNavigate  } from "react-router-dom";
import Basket from './components/Basket/Basket';
import { getLocalStorage, setLocalStorage } from './localStorage';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function App() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate ();

  const selectedVal = getLocalStorage('modifiedList');

  useEffect(() => {
  }, [open]);


  const onChange = (event, newValue) => {
    setValue(newValue);
  }

  const alertBasket = () => {
    const checkVal = getLocalStorage('isCheckBasket');

    if(selectedVal.length && !checkVal){
      setOpen(true);
    }
  };

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1 && !open) {
        setLocalStorage('isCheckBasket', false);
        alertBasket();
      }
    }
  }, [])

  const deleteBasket = () => {
    setLocalStorage('selectedProducts', []);
    setLocalStorage('modifiedList', []);
    setOpen(false);
    setLocalStorage('isCheckBasket', true);
  }
 
  const closeWarning = () => {
    setLocalStorage('selectedProducts', getLocalStorage('selectedProducts'));
    setLocalStorage('modifiedList', getLocalStorage('modifiedList'));
    setOpen(false);
    setLocalStorage('isCheckBasket', true);
    
  }

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<ProductPageComponent />} />
          <Route path="basket" element={<Basket />} />
      </Routes>

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
      
      <Dialog open={open}>
      <DialogTitle>Yarım kalmıs sepetiniz var devam etmek istiyor musunuz?</DialogTitle>
      <Button onClick={closeWarning}>Evet</Button>
      <Button onClick={deleteBasket}>Hayır</Button>
      </Dialog>
    </div>
  );
}

export default App;
