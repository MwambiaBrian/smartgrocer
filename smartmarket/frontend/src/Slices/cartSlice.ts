import { createSlice} from "@reduxjs/toolkit";



const initialState = {
    cartItems: [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0

}
const cartSlice = createSlice({
name: "cart",
initialState,
reducers: {
    addToCart(state: any, action) {
        state.cartItems.push(action.payload)

    }
}
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
