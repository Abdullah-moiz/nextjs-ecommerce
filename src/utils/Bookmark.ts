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

interface BookmarkItem {
    productID: Product;
    userID: User;
    _id: string;
}

interface Data {
    bookmark: [];
}


const initialState: Data = {
    bookmark: [],
}


export const BookmarkSlice = createSlice({
    name: 'Bookmark',
    initialState,
    reducers: {
        setBookmark: (state, action) => {
            state.bookmark =  action.payload
        },
    },
})

export const {setBookmark } = BookmarkSlice.actions

export const bookmarkReducer = BookmarkSlice.reducer;