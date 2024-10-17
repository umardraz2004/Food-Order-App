import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    renderModal: 'cartInfoModal',
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeView(state, action) {
            state.renderModal = action.payload;
        }
    },
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;