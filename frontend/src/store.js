import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productsSlice";
import productDetailsSlice from "./features/productDetailsSlice";
import userSlice from "./features/userSlice";
import authSlice from "./features/authSlice";
import forgotPasswordSlice from "./features/forgotPasswordSlice";
import cartSlice from "./features/cartSlice";
import myOrdersSlice from "./features/myOrdersSlice";
import orderDetailsSlice from "./features/orderDetailsSlice";
import newReviewSlice from "./features/newReviewSlice";
import newProductSlice from "./features/newProductSlice";
import productSlice from "./features/productSlice";
import allOrdersSlice from "./features/allOrdersSlice";
import newOrderSlice from "./features/newOrderSlice";
import orderSlice from "./features/orderSlice";
import allUsersSlice from "./features/allUsersSlice";
import userDetailsSlice from "./features/userDetailsSlice";
import productReviewsSlice from "./features/productReviewsSlice";
import reviewSlice from "./features/reviewSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    productDetails: productDetailsSlice,
    newProduct: newProductSlice,
    product: productSlice,
    productReviews: productReviewsSlice,
    review: reviewSlice,
    auth: authSlice,
    user: userSlice,
    allUsers: allUsersSlice,
    userDetails: userDetailsSlice,
    forgotPassword: forgotPasswordSlice,
    cart: cartSlice,
    newOrder: newOrderSlice,
    myOrders: myOrdersSlice,
    orderDetails: orderDetailsSlice,
    allOrders: allOrdersSlice,
    order: orderSlice,
    newReview: newReviewSlice,
  },
});
