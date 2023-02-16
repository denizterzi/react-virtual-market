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
const ProductList = ({handleChange}) => {

  // interface ProductCategories {
  //   category: string;
  //   products: [
  //     {
  //       title: string;
  //       image: null;
  //       price: number;
  //     }
  //   ]
  // };


  const [itemData, setItemData] = useState();
  const [productCat, setProductCat] = useState();


  const  getProducts = async () => {
    const result = await fetch('https://dummyjson.com/products').then(res => res.json());
    console.log('res', result.products);
    setItemData(result.products);
    return result;
  }
  const clamp = (value) => Math.max(0, value);
  const offset = 0;

  const isBetween = (value, floor, ceil) => {
    // const test = value >= floor && value <= ceil;
    // console.log('value', value);
    return (value >= floor && value <= ceil); //|| (value <= floor && value <= ceil)
  };

  useEffect(() => {
    // this.handleChange = this.handleChange.bind(this);

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
            // .findIndex(element.id);
            handleChange(e, test2);            
          }

          //return null;

          // return { id, top, bottom };
        })
        //.find(({ top, bottom }) => isBetween(scroll, top, bottom));
        //console.log('position', position);

      //setActiveId(position?.id || "");
    };
    window.addEventListener('scroll', onScroll);

    if(!productCat){
      getProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCat]);

  useEffect(() => {
    // const test = _.uniqBy(itemData?.map((x) => x.category));
    // const test2 = _.keyBy(itemData, 'category');
    var grouped = _.mapValues(_.groupBy(itemData, 'category'));
    // var grouped = _.mapValues(_.groupBy(itemData, 'category'), x => x.map(y => _.omit(y, 'category')));
    const arr = Object.keys(grouped).map(key => ({ key, value: grouped[key] }));

    // console.log('test', test);
    // console.log('grouped',arr);
    setProductCat(arr);

    // setProductCat(_.uniqBy(test))
    
  },[itemData]);

  const onclickAddBtn = () => {

  }


  // useEffect(() => {
  //   console.log('productCat', productCat);
  // }, [productCat])

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
                        onClick={onclickAddBtn}
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
