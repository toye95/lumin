import React from 'react';
import { useQuery } from '@apollo/client';
import ProductItem from '../../components/productitem/ProductItem';
import styles from './Products.module.scss'
import { addToCart } from './productSlice'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../queries/query'

function Products() {
    const dispatch = useDispatch()
    const {currency} = useSelector(state => state.products)
const { loading, error, data } = useQuery(getProducts(currency));



const addItemToCart = (id, title, price, image_url) => {
    dispatch(addToCart({id, title, price, image_url}))
    document.getElementById("cart").classList.remove('close');
    document.getElementById("cart").classList.add('open');
    document.getElementById("overlay").style.display = "block";
}

  return (
    <div className="">
     {loading && <p style={{textAlign: 'center'}}>Loading...</p>}
     {error && <p>An error occurred while fetching data</p>}
     <div className={styles.overlay} id="overlay"></div>
     <div className={styles.productsContainer}>
        {data && data.products.length ? data.products.map(item => (
            <ProductItem data={item} currency={currency} addItemToCart={addItemToCart} key={item.id.toString()}/>
        )): []}
     </div>
    </div>
  );
}

export default Products;
