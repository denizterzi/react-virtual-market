import * as React from 'react';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar } from '@mui/material';
import _ from 'lodash';

const Categories = ({value, handleChange}) => {
  const [defaultCategories, setCategories] = useState();

  const  getCategories = async () => {
    const result = await fetch('https://dummyjson.com/products').then(res => res.json());
    const uniqCategories = _.uniqBy(result.products?.map((x) => x.category));
    setCategories(uniqCategories);
    return result;
  }

  useEffect(() => {
    getCategories();
  }, []);  

  return defaultCategories?.length && (
    <AppBar style={{backgroundColor: 'white'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable force tabs example"
        tabItemContainerStyle={{position: "fixed", bottom:"0"}}
        selectionFollowsFocus={true}
        
        >
        {defaultCategories.map((category) => 
            <Tab label={category} />
        )}
        </Tabs>
    </AppBar>
    
   
  )
}

export default Categories;
