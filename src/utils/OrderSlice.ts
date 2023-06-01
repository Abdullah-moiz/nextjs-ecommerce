import { createSlice } from '@reduxjs/toolkit'


interface Data {
    order: [];
}


const initialState: Data = {
    order: [],
}


export const OrderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order =  action.payload
        },
    },
})

export const {setOrder  } = OrderSlice.actions

export const OrderReducer = OrderSlice.reducer;