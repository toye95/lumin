import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/cartitem/CartItem";
import styles from "./Cart.module.scss";
import { removeFromCart, updateCart, setCurrency, increase, decrease } from "../products/productSlice";
import { useQuery } from '@apollo/client';
import { getCurrencies, getProducts } from '../../queries/query'
import { client } from "../../services/default.service";

function Cart() {
  const { cartItems, total, currency } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { data } = useQuery(getCurrencies());

  const closeCart = () => {
    document.getElementById("cart").classList.remove("open");
    document.getElementById("cart").classList.add("close");
    document.getElementById("overlay").style.display = "none";
  };

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const increaseQuantity = (id) => {
    dispatch(increase(id));
  };

  const decreaseQuantity = (id) => {
    dispatch(decrease(id));
  };

  const onChange = (e) => {
    const value = e.target.value
    client
        .query({
            query: getProducts(value)
        })
    .then(data => {
        dispatch(setCurrency(value))
        dispatch(updateCart(data.data.products))
    });
  }

  return (
    <div className="">
      <div id="cart" className={styles.cart}>
        <a
          className={styles.closebtn}
          onClick={closeCart}
        >
          &times;
        </a>
        <select className={styles.currency} onChange={onChange}>
            {data && data.currency.map(curr => (
                <option value={curr} key={curr}>{curr}</option>
            ))}
        
        </select>
        {cartItems && cartItems.length
          ? cartItems.map((item) => (
              <CartItem
                data={item}
                key={item.id.toString()}
                currency={currency}
                removeItemFromCart={removeItemFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            ))
          : []}
          <div className={styles.subtotal}>
              <div className={styles.text}>Subtotal</div>
              <div className={styles.totalText}>{currency} {total.toFixed(2)}</div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>proceed to checkout</button>
          </div>
      </div>
    </div>
  );
}

export default Cart;
