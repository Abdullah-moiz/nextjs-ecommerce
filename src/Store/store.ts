'use client'


import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '@/utils/testSlice'


export const store = configureStore({
    reducer: {
        Counter : counterReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;