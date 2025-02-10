import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state.isLoggedIn = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
