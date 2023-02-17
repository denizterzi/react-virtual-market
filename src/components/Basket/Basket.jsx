import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getLocalStorage, setLocalStorage } from '../../localStorage';
// import Badge from '@mui/material/Badge';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Basket = () => {
  const [isChange, setChange] = useState(false);

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const modifiedList = getLocalStorage('modifiedList');


  const invoiceTotal = modifiedList?.map((item) => (item.price*item.quantity)).reduce((sum, i) => sum + i, 0)

  const addList = (currId) => {
    const currentList = getLocalStorage('modifiedList');
    const currVal = currentList.find(x => x.id === currId);
    currVal.quantity = currVal.quantity + 1;
    setLocalStorage('modifiedList', currentList);
    const products = getLocalStorage('selectedProducts');
    const addedProduct = products.find(x => x.id === currId);
    setLocalStorage('selectedProducts', [...products, addedProduct])
    setChange(!isChange);
  }

  const removeList = (currId) => {
    let currentList = getLocalStorage('modifiedList');
    const currVal = currentList.find(x => x.id === currId);
    currVal.quantity = currVal.quantity - 1;
    const products = getLocalStorage('selectedProducts');
    if(currVal.quantity === 0){
      currentList = currentList.filter(x => x.id !== currId);
      setLocalStorage('selectedProducts', products.filter(x => x.id !== currId));
      setChange(!isChange);
    }

    setLocalStorage('modifiedList', currentList);
    setChange(!isChange);
  }

  const deleteBasket = () => {
    setLocalStorage('selectedProducts', []);
    setLocalStorage('modifiedList', []);
    setChange(!isChange);
  }

  return (
    modifiedList?.length ? (
      <div>
    <TableContainer component={Paper}>
      <Table  aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>  
        <TableBody>
          {modifiedList?.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">
              {/* <Badge color="secondary" badgeContent={count}>
              <p>{row.quantity}</p>
              </Badge> */}
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  // onClick={() => {
                  //   setCount(Math.max(count - 1, 0));
                  // }}
                  onClick={() => removeList(row.id)}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  // aria-label="reduce"
                  // onClick={() => {
                  //   setCount(Math.max(count - 1, 0));
                  // }}
                >
                  {row.quantity}
                </Button>
                <Button
                  aria-label="increase"
                  // onClick={() => {
                  //   setCount(count + 1);
                  // }}
                  onClick={() => addList(row.id)}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              </TableCell>
              <TableCell align="right">{ccyFormat(row.price*row.quantity)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick={deleteBasket}>
        <DeleteOutlineOutlinedIcon fontSize="small" />
        <p>Sepeti Temizle</p>
    </Button>
      </div>
      
    
    ) : <div style={{fontSize: '2em', padding: '2em'}}> Sepetiniz Boş </div>
  )
}

export default Basket;
