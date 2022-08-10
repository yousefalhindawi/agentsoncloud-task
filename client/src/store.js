import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/users/productsSlice";
import usersReducer from "./features/users/userSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
  },
});
