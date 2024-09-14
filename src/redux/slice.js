import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favourites : [] ,
  cart : [] 
};


export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {

      updateFavourites: (state,action)=>{
        state.favourites=action.payload;
      },

      removeFavourites : (state,action)=>{
        state.favourites = state.favourites.filter(item => item.id !== action.payload.id);
      },


      addToCart: (state,action)=>{
        state.cart=action.payload;
      },

      removeFromCart : (state,action)=>{
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
      },

      increaseItemValue: (state,action)=>{
        let index = state.cart.findIndex(obj => obj.id === action.payload.id);
        let temp = state.cart[index];
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
        temp = {...temp , num :temp.num + 1 } ;
        state.cart.push(temp);
      },

      decreaseItemValue: (state,action)=>{
        let index = state.cart.findIndex(obj => obj.id === action.payload.id);
        let temp = state.cart[index];

        if(state.cart[index].num === 1) {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
            return ;
        }
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
        temp = {...temp , num :temp.num - 1 } ;
        state.cart.push(temp);
      },
    },
  });

export const {updateFavourites,removeFavourites,addToCart,removeFromCart,increaseItemValue,decreaseItemValue}=projectSlice.actions;

export default projectSlice.reducer;

