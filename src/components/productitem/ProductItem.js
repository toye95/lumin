import React from 'react';
import styles from './ProductItem.module.scss'


function ProductItem(props) {
    const { id, title, image_url, price } = props.data

  return (
    <div className={styles.product}>
      <div className={styles.imgContainer}><img src={image_url} alt="" className={styles.img}/></div>
      <div className={styles.productTitle}>{title}</div>
      <div className={styles.price}>From {props.currency} {price.toFixed(2)}</div>
      <button className={styles.button} onClick={() => props.addItemToCart(id, title, price, image_url)}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
