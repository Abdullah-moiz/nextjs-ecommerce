import { createSlice } from '@reduxjs/toolkit'

interface NavState {
    category : any[],
    catLoading : boolean,
    productLoading : boolean,
    product : any[],
}

const initialState : NavState = {
    category : [],
    catLoading : false,
    productLoading : false,
    product : [],
}

export const Admin = createSlice({
  name: 'AdminData',
  initialState,
  reducers: {
    setCategoryData : (state, action) => {
        state.category = action.payload
    },
    setProductData : (state, action) => {
        state.category = action.payload
    },
    setCatLoading : (state , action) => {
      state.catLoading = action.payload
    },
    setProdLoading : (state , action) => {
      state.productLoading = action.payload
    }

    
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryData ,setCatLoading , setProdLoading  , setProductData} = Admin.actions

export const AdminReducer =  Admin.reducer