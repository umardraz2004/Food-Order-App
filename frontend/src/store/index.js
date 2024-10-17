import { configureStore } from "@reduxjs/toolkit";
import foodSlice from './foodSlice'
import uiSlice from './uiSlice'

const store = configureStore({
    reducer: {
        meals: foodSlice,
        ui: uiSlice,
    },
})

export default store;