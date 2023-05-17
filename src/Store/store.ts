'use client'


import { AdminNavReducer } from '@/utils/AdminNavSlice';
import { AdminReducer } from '@/utils/AdminSlice';
import { UserReducer } from '@/utils/UserDataSlice';
import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '@/utils/CartSlice';



export const store = configureStore({
    reducer: {
        User : UserReducer,
        AdminNav : AdminNavReducer,
        Admin : AdminReducer,
        Cart : cartReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;