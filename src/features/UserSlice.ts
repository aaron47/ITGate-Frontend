import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  username: string;
  access_token?: string;
  refresh_token?: string;
}

const initialState: UserState = {
  _id: '',
  username: '',
  access_token: '',
  refresh_token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },

    setTokens: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
  },
});

export const { setUser, setTokens } = userSlice.actions;
export default userSlice.reducer;
