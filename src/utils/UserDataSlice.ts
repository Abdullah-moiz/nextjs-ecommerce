import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    userData:  [] | null,
    userToken: string | null,
}

const initialState : UserState = {
    userData:  null,
    userToken: null,
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData : (state, action) => {
        state.userData = action.payload
    },
    setUserToken : (state, action) => {
        state.userToken = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserData  , setUserToken } = userSlice.actions

export const UserReducer =  userSlice.reducer