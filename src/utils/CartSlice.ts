import { createSlice } from '@reduxjs/toolkit'


interface Product {
    productName: string;
    productPrice: string;
    _id: string;
    productImage: string;
    productQuantity: number;
}

interface User {
    email: string;
    _id: string;
}

interface CartItem {
    productID: Product;
    userID: User;
    _id: string;
}

interface Data {
    cart: null;
    total: number;
}


const initialState: Data = {
    cart: null,
    total: 0,
}


export const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart =  action.payload
        },
        setTotalPrice: (state, action) => {
            state.total = action.payload
        }
    },
})

export const { setCart , setTotalPrice } = cartSlice.actions

export const cartReducer = cartSlice.reducer;