import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { setLocalStorage, getLocalStorage } from '../../localStorage';


const ProductList = ({handleChange}) => {

  const [itemData, setItemData] = useState();
  const [productCat, setProductCat] = useState();


  const  getProducts = async () => {
    const result = await fetch('https://dummyjson.com/products').then(res => res.json());
    setItemData(result.products);
    return result;
  }
  const clamp = (value) => Math.max(0, value);
  const offset = 0;

  const isBetween = (value, floor, ceil) => {
    return (value >= floor && value <= ceil); 
  };

  useEffect(() => {
    const onScroll = (e) => {
      const scroll = window.pageYOffset;
      // eslint-disable-next-line array-callback-return
      productCat?.map((id) => {
          const element = document.getElementById(id.key);
          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          if(isBetween(scroll, top, bottom)){
            const test = productCat.map(x => {return x.key});
            const test2 = test.findIndex(x => x === element.id);
            handleChange(e, test2);            
          }

        })
    };
    window.addEventListener('scroll', onScroll);

    if(!productCat){
      getProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCat]);

  useEffect(() => {
    var grouped = _.mapValues(_.groupBy(itemData, 'category'));
    const arr = Object.keys(grouped).map(key => ({ key, value: grouped[key] }));
    setProductCat(arr);
    
  },[itemData]);

  const onclickAddBtn = (val) => {
    const currentValues = getLocalStorage('selectedProducts');
    const newValues = currentValues ? [...currentValues, val] : [val];
    setLocalStorage('selectedProducts', newValues)

    let modifiedList = [];

    const products = getLocalStorage('selectedProducts');
    products?.filter(element => {
        const currentVal = modifiedList.find(x => x.id === element.id);
        if(!currentVal){
          modifiedList.push({
            id: element.id,
            quantity: 1,
            desc: element.title,
            price: element.price
          });
        } else{
          currentVal.quantity = currentVal.quantity + 1;
        }
        return modifiedList;
    });
  
    setLocalStorage('modifiedList', modifiedList);  


  }

  return productCat?.length && (
    productCat.map(test => (
      <ImageList style={{marginTop: '3em'}}>
      <ImageListItem key="Subheader" cols={2} >
        <ListSubheader component="div" style={{textAlign: 'left', zIndex:'-1'}} id={test.key}>{test.key.toUpperCase()}</ListSubheader>
      </ImageListItem>
      {test.value.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.images[0]}?w=248&fit=crop&auto=format`}
            srcSet={`${item.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.price + ' TL'}
            subtitle={item.title}
            actionIcon={
                <Tooltip title={item.title} arrow>
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.title}`}
                        onClick={() => onclickAddBtn(item)}
                    >
                        <AddBoxOutlinedIcon />
                    </IconButton>
                </Tooltip>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    ))
  );
}

export default ProductList;
