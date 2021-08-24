import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ id, quantity }) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)

    return {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    }
  },
)

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingInfo: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload,
      )
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
    },
  },
  extraReducers: {
    [addItemToCart.fulfilled]: (state, action) => {
      const item = action.payload
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product,
      )
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i,
        )
      } else {
        state.cartItems.push(item)
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
  },
})

export const { removeItemFromCart, saveShippingInfo } = cartSlice.actions
export default cartSlice.reducer
