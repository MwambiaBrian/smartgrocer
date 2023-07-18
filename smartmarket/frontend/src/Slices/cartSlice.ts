import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast, ToastOptions } from "react-toastify";

interface CartItem {
    // Define the structure of the cart item
    businessId: string
     _id: string;
    productId: string;
    price: number
    cartQuantity: number;
    // Add other properties if needed
  }
interface State {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

interface AddToCartPayload {
_id:string;
  productId: string;
  businessId: string;
  
  // Add more properties as needed for your payload
}

const cartItemsJson = localStorage.getItem("cartItems");
const cartItems: CartItem[] = cartItemsJson
  ? JSON.parse(cartItemsJson)
  : [];

const initialState: State = {
  cartItems: cartItems,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

  

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        } as ToastOptions);
      } else {
        let tempProductItem: any = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        } as ToastOptions);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id=== action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        } as ToastOptions);
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        } as ToastOptions);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<AddToCartPayload>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      toast.error("Product removed from cart", {
        position: "bottom-left",
      } as ToastOptions);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
