import { createSlice } from '@reduxjs/toolkit';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

const initialState: any = {
    user: null,
}

const newUser = "ICe";
const supabase = createClientComponentClient(); 
const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("current user: ", user);
    return user;
}  

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = getCurrentUser();
        },      
    }
})

export const { getUser } = userSlice.actions

export default userSlice.reducer