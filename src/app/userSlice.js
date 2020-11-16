import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';


export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
     //thunkAPI.dispatch
     const currentUser = await userApi.getMe();
     return currentUser;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
     current: {},
     loading: false,
     error: '',
  },
  reducers: {},
  extraReducers:{
       // With this getMe(), it have 3 state like this
       //Beginning
       [getMe.pending]: (state) => {
            state.loading = true;
       },
       //have error
       [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
       },
       //successfully
       [getMe.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payload;
       },
  }
});



const { reducer: userReducer} = userSlice;
export default userReducer;