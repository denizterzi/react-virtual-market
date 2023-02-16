import React, { createContext, useContext } from "react";
import {IProductModel} from '../../models/index';

type IProductContext = [IProductModel, React.Dispatch<React.SetStateAction<IProductModel>>];

const Context = createContext<IProductContext | null>(null);

const useProductContext = (): IProductContext => {
    const context = useContext(Context);
  
    if (!context) {
      throw new Error('Error');
    }
  
    return context;
  };

const ProductContextProvider = (props) => {
    // const [test, setTest] = useState<IProductModel>();

    return <Context.Provider value={props.value}>
        {props.children}
    </Context.Provider>
}


export {ProductContextProvider, useProductContext};