import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'src/app/authSlice';
export default configureStore({
    //for export with multiple reducer
    reducer: {
        auth: authReducer
    }
});
