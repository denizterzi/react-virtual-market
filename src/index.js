import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {CardContextProvider} from './contexts/card-context/CardContextProvider.tsx';
// import {ProductContextProvider} from './contexts/product-context/ProductContextProvider.tsx';
// import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter  } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
// const queryClient = new QueryClient()


root.render(
  <React.StrictMode>
      {/* <QueryClientProvider client={queryClient} contextSharing={true}> */}
        {/* <ProductContextProvider>
          <CardContextProvider> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/* </CardContextProvider>
        </ProductContextProvider> */}
      {/* </QueryClientProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
