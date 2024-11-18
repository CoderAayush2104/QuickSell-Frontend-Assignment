import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunks for data fetching
export const fetchAllData = createAsyncThunk(
  "data/fetchAllData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment/"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const selectData = createAsyncThunk(
  "data/selectData",
  async ({ group, allTickets, orderValue }, { rejectWithValue }) => {
    try {
      let user = false;
      let mySet = new Set();
      let arr = [], selectedData = [];
      
      if (group === "status") {
        allTickets.forEach((element) => {
          mySet.add(element.status);
        });
        arr = [...mySet];
        arr.forEach((element, index) => {
          let arr = allTickets.filter((fElement) => {
            return element === fElement.status;
          });
          selectedData.push({
            [index]: {
              title: element,
              value: arr,
            },
          });
        });
      } else if (group === "user") {
        user = true;
        allTickets?.allUser?.forEach((element, index) => {
          arr = allTickets?.allTickets?.filter((Felement) => {
            return element.id === Felement.userId;
          });
          selectedData.push({
            [index]: {
              title: element.name,
              value: arr,
            },
          });
        });
      } else {
        let prior_list = ["No priority", "Urgent", "High", "Medium", "Low"];
        prior_list.forEach((element, index) => {
          arr = allTickets.filter((fElement) => {
            return index === fElement.priority;
          });
          selectedData.push({
            [index]: {
              title: element,
              value: arr,
            },
          });
        });
      }
      if (orderValue === "title") {
        selectedData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
        });
      }
      if (orderValue === "priority") {
        selectedData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => b.priority - a.priority);
        });
      }

      return { selectedData, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    allTickets: [],
    allUser: [],
    selectedData: [],
    user: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.allTickets = action.payload.tickets;
        state.allUser = action.payload.users;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allTickets = [];
        state.allUser = [];
      })
      .addCase(selectData.pending, (state) => {
        state.loading = true;
        state.selectedData = [];
      })
      .addCase(selectData.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedData = action.payload.selectedData;
        state.user = action.payload.user;
      })
      .addCase(selectData.rejected, (state, action) => {
        state.loading = false;
        state.selectedData = [];
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
