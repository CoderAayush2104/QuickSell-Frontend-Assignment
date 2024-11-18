import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    allTickets: [],
    allUsers: [],
    group: "status",
    order: "priority",
    filteredData: [],
    user: false,
    error: null,
  },
  reducers: {
    setLoading : (state,action) =>{
      state.loading = action.payload
    },
    setError : (state,action) => {
      state.error = action.payload
    },
    setAllTickets : (state,action) => {
      state.allTickets = action.payload
    },
    setAllUsers : (state,action) => {
      state.allUsers = action.payload
    },
    setFilteredData : (state,action) => {
      state.filteredData = action.payload
    },
    setUser : (state,action) => {
      state.user = action.payload
    },
    updateGroup: (state, action) => {
      state.group = action.payload; 
    },
    updateOrder: (state, action) => {
      state.order = action.payload; 
    },
  },
});

export const { setLoading,setError,setAllTickets,setAllUsers,setFilteredData,setUser,updateGroup, updateOrder } = dataSlice.actions;

export default dataSlice.reducer;