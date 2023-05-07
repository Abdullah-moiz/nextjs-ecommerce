'use client'


import { AdminNavReducer } from '@/utils/AdminNavSlice';
import { AdminReducer } from '@/utils/AdminSlice';
import { UserReducer } from '@/utils/UserDataSlice';
import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
    reducer: {
        User : UserReducer,
        AdminNav : AdminNavReducer,
        Admin : AdminReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;