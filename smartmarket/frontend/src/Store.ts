import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/authSlice";
import cartReducer from './Slices/cartSlice';
import ProductsReducer from './Slices/ProductsSlice';
import businessReducer from './Slices/businessSlice';
// ...

export const store = configureStore({
    reducer: {
 
      auth: authReducer,
      cart: cartReducer,
      products: ProductsReducer,
      businesses: businessReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(),
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch