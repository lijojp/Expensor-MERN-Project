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
      console.log("i am auth.js-from category", payload);
      console.log("i am auth.js-from login", payload.user);
      state.user = payload.user
      // state.user = payload.user
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


// ///////////////////////////////////////////////////////
// import { createSlice } from '@reduxjs/toolkit'

// export const authSlice = createSlice({
//     name: 'auth',
//   initialState: {
//     isAuthenticated: false,
//     user:{},
//   },
//   reducers: {
//     login:(state, { payload })=>{
//       state.user = payload.user
//       state.isAuthenticated = true
//     },

//     setUser: (state, { payload }) => {
//       // console.log(2);
//       console.log("i am auth.js-from category", payload);
//       console.log("i am auth.js-from login", payload.user);
//       state.user = payload
//       // state.user = payload.user
//       state.isAuthenticated = true
//     },
//     logout: (state)=>{
//       state.user = {}
//       state.isAuthenticated = false
//     }
//   },
// })

// export const { setUser, logout,login } = authSlice.actions
// export default authSlice.reducer

