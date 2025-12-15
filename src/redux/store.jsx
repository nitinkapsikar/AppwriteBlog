import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slice/AuthSlice";

export const store = configureStore({
    reducer:{
        [AuthSlice.name]:AuthSlice.reducer
    }

})