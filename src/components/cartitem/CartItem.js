import React from 'react';
import styles from './CartItem.module.scss'

function CartItem(props) {
    const { id, title, price, image_url, quantity } = props.data

  return (
    <div className={styles.card}>
          <a className={styles.closebutton} onClick={() => props.removeItemFromCart(id)}>&times;</a>
          <div className={styles.productDetails}>
          <div className={styles.title}>
                {title}
            </div>
            <div className={styles.quantity}>
                <button className={styles.button} onClick={() => props.decreaseQuantity(id)}>-</button>
                <button className={styles.button}>{quantity}</button>
                <button className={styles.button} onClick={() => props.increaseQuantity(id)}>+</button>
            </div>
            <div className={styles.price}>
                {props.currency} {price.toFixed(2)}
            </div>
            <div>
                <img src={image_url} className={styles.img} alt=""/>
            </div>
          </div>
    </div>
  );
}

export default CartItem;
