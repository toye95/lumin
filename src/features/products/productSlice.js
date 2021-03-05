import { createSlice } from '@reduxjs/toolkit';

const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, val) => acc + (val.price * val.quantity), 0)
    return total
}

const remove = (cartItems, id) => {
    cartItems.forEach((item, index) => {
        if (item.id === id){
            cartItems.splice(index, 1)
        }
    })
}
const initialState = {
  isLoading: false,
  error: '',
  cartItems: [],
  total: 0,
  currency: "USD"
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, { payload } ) => {
        const cartItems = state.cartItems
        const item = cartItems.find(item => item.id === payload.id)
        if (item){
            item.quantity += 1
        } else {
            payload.quantity = 1
            cartItems.push(payload)
        }
        state.cartItems  = cartItems
        state.total = calculateTotal(state.cartItems)
    },

    removeFromCart: (state, { payload }) => {
        const id = payload
        const cartItems = state.cartItems
        remove(cartItems, id)
        state.cartItems = cartItems
        state.total = calculateTotal(state.cartItems)
    },

    updateCart: (state, { payload }) => {
        const cartItems = state.cartItems
        payload.forEach(obj => {
            cartItems.forEach(item => {
                if (item.id === obj.id){
                    item.price = obj.price
                }
            })
        })
        state.cartItems = cartItems
        state.total = calculateTotal(state.cartItems)
    },

    setCurrency: (state, { payload }) => {
        state.currency = payload
    },

    increase: (state, { payload }) => {
        const id = payload
        const cartItems = state.cartItems
        const item = cartItems.find(item => item.id === id)
        if (item) {
            item.quantity += 1
        }
        state.cartItems = cartItems
        state.total = calculateTotal(state.cartItems)
    },

    decrease: (state, { payload }) => {
        const id = payload
        const cartItems = state.cartItems
        const item = cartItems.find(item => item.id === id)
        if (item && item.quantity > 1) {
            item.quantity -= 1
        } else {
            remove(state.cartItems, id)
        }
        state.cartItems = cartItems
        state.total = calculateTotal(state.cartItems)
    }
  }
});

export const { addToCart, removeFromCart, updateCart, setCurrency, increase, decrease } = productSlice.actions;

export default productSlice.reducer;
