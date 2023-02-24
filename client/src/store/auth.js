import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
  initialState: {
    isAuthenticated: false,
    user:{},
  },
  reducers: {
    setUser: (state, { payload }) => {
      // console.log(2);
      // console.log(payload.user);
      state.user = (payload?.user)
      state.isAuthenticated = true
    },
    logout: (state)=>{
      state.user = {}
      state.isAuthenticated = false
    }
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer