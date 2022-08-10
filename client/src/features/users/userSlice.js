import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const register = createAsyncThunk("users/register", async (userData,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(userData)
       const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:30155/api/users/register',
        headers: { Accept: 'application/json' },
        data: userData
    });
    console.log(response)
    if (response.data.status === 200) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        const user = await response.data.user;
        return user;
    }else{
        // console.log(response.data.errors)
        const errors = response.data.errors;
        throw new Error (errors)
    }
    }catch (error){
      console.error(error);
      return rejectWithValue(error.message);
    }
  });

  //login
export const login = createAsyncThunk("users/login", async (userData,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
    //   console.log(userData)
       const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:30155/api/users/login',
        headers: { Accept: 'application/json' },
        data: userData
    });
    console.log(response)
    if (response.data.status === 201) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('logged_user', JSON.stringify(response.data.loggedUser))
          localStorage.setItem('token', JSON.stringify(response.data.token))
        const data = await response.data;
        return data;
    }else if(response.data.status === 400){
        console.log(response.data.errors)
        const errors = response.data.errors;
        throw new Error (errors)
    }else if(response.data.status === 204){
        const errors = response.data.errors;
        throw new Error (errors)
    }
    }catch (error){
      console.error(error);
      return rejectWithValue(error.message);
    }
  });



const usersSlice = createSlice({
    name:'users',
    initialState:{
        user: {},
        token:'',
        errors:null,
    },
    reducers: { 
         logout:(state)=>{
            localStorage.removeItem('logged_user')
            localStorage.removeItem('token')
            state.user = {};
            state.token = '';
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'logged out Successfully',
                showConfirmButton: false,
                timer: 1500
              })
        }
    },
    extraReducers:{
        // register
        [register.pending]: (state, action) => {
            state.errors = null;
          },
          [register.fulfilled]: (state, action) => {
    
          },
          [register.rejected]: (state, action) => {
              state.errors = action.payload;
                // console.log('yousef',state.errors)
          },
          // login
          [login.pending]: (state, action) => {
            state.errors = null;
          },
          [login.fulfilled]: (state, action) => {
              console.log('login',action.payload)
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.errors = null;
          },
          [login.rejected]: (state, action) => {
              state.errors = action.payload;
                // console.log('yousef',state.errors)
          },
       
    }
});
export const {logout} = usersSlice.actions;
export default usersSlice.reducer;