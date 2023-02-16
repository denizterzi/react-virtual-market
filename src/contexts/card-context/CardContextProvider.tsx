import React, { createContext, useContext } from "react";
import {ICardModel} from '../../models/index';

type ICardContext = [ICardModel, React.Dispatch<React.SetStateAction<ICardModel>>];

const Context = createContext<ICardContext | null>(null);

const useCardContext = (): ICardContext => {
    const context = useContext(Context);
  
    if (!context) {
      throw new Error('Error');
    }
  
    return context;
  };

const CardContextProvider = (props) => {
    // const [test, setTest] = useState<ICardModel>();

    return <Context.Provider value={props.value}>
        {props.children}
    </Context.Provider>
}


export {CardContextProvider, useCardContext};