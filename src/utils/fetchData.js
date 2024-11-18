import axios from "axios";

import { setAllTickets, setAllUsers, setLoading } from "../store/dataSlice";

// Utility function to fetch data
const fetchData = async (dispatch) => {
    const url = 'https://api.quicksell.co/v1/internal/frontend-assignment/'
  try {
    dispatch(setLoading(true)); 
    const { data } = await axios.get(url); 
    dispatch(setAllTickets(data.tickets))
    dispatch(setAllUsers(data.users))
  } catch (error) {
    console.error("Error fetching data:", error); 
    dispatch(setAllTickets([])); 
    dispatch(setAllUsers([])); 
    throw error; 
  } finally {
    dispatch(setLoading(false)); 
  }

};

export default fetchData;
