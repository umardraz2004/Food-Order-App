import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    cartItems: [],
    totalQuantity: 0,
    totalCartPrice: 0,
    isCartEmpty: true,
    loading: true,
};

const foodItem = createSlice({
    name: "meal",
    initialState: initialState,
    reducers: {
        setMeal(state, action) {
            state.items = action.payload;
        },
        submitOrder(state, action) {
            state.order = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
            console.log(state.loading);
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.totalQuantity++
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    description: newItem.description,
                    totalPrice: parseFloat(newItem.price).toFixed(2),
                    quantity: 1
                });
                if (state.cartItems.length > 0) {
                    state.isCartEmpty = false
                }
                state.totalCartPrice += parseFloat(newItem.price);
            }
            else {
                console.log('Add more quantity in existing quantity from cart')
            }
        },
        increaseItemInCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;

                existingItem.totalPrice = parseFloat(existingItem.quantity) * parseFloat(newItem.price);
                state.totalCartPrice += parseFloat(newItem.price);
            }
            else {
                console.log('Add more quantity in existing quantity from cart')
            }
        },
        decreaseItemInCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity--;
                existingItem.totalPrice = parseFloat(existingItem.quantity) * parseFloat(newItem.price);
                state.totalCartPrice -= parseFloat(newItem.price);
                if (existingItem.quantity <= 0) {
                    state.totalCartPrice += 0;
                    state.totalQuantity--;
                    state.cartItems = state.cartItems.filter(item => item.id !== newItem.id);
                    if (state.cartItems.length === 0) {
                        console.log('Cart is empty');
                        state.isCartEmpty = true
                    }
                }
            }
            else {
                console.log('Add more quantity in existing quantity from cart')
            }
        },
        emptyTheUserCart(state) {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalCartPrice = 0;
            state.isCartEmpty = true;
        }
    },
});

export const cartActions = foodItem.actions;

export default foodItem.reducer;