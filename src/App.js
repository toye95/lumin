import React from 'react';
import './App.css';
import Cart from './features/cart/Cart';
import Header from './features/header/Header';
import Products from './features/products/Products';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/default.service';


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header/>
        <Products/>
        <Cart/>
      </div>
    </ApolloProvider>
  );
}

export default App;
