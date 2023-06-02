import { createSlice } from '@reduxjs/toolkit'

interface NavState {
    category : any[],
    catLoading : boolean,
    productLoading : boolean,
    product : any[],
    Order : any[],
    orderLoading : boolean,
}

const initialState : NavState = {
    category : [],
    catLoading : false,
    productLoading : false,
    product : [],
    Order : [],
    orderLoading : false,
}

export const Admin = createSlice({
  name: 'AdminData',
  initialState,
  reducers: {
    setCategoryData : (state, action) => {
        state.category = action.payload
    },
    setProductData : (state, action) => {
        state.product = action.payload
    },
    setCatLoading : (state , action) => {
      state.catLoading = action.payload
    },
    setProdLoading : (state , action) => {
      state.productLoading = action.payload
    },
    setOrderData : (state , action) => {
      state.Order = action.payload
    },
    setOrderLoading : (state , action) => {
      state.orderLoading = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { setCategoryData ,setCatLoading , setProdLoading  , setProductData , setOrderData , setOrderLoading} = Admin.actions

export const AdminReducer =  Admin.reducer