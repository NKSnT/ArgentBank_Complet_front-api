import { configureStore } from '@reduxjs/toolkit';


import authReducer from 'src/app/authSlice'
export default configureStore({ //for export with multiple reducer
  reducer: {      
    auth: authReducer
  },
});





//single action containing both token && user data
//-> to be use by the 2 reducer at the same time 

/*
//dispatch something like
{ 
  type: "auth/newAuth",  payload: {token: "****", user: {***}} 
}

//for reducer side






*/
