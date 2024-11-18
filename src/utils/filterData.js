import { setError, setFilteredData, setLoading, setUser } from "../store/dataSlice";


const filterData = async (dispatch, groupValue, allTickets, orderValue) => {
    try {
      dispatch(setLoading(true));
      dispatch(setFilteredData([]));
    
      let user = false;
      let mySet = new Set();
      let arr = [];
      let filteredData = [];
   
  
      if (groupValue === "status") {
        allTickets.forEach((element) => {
          mySet.add(element.status);
        });
        arr = [...mySet];
        arr.forEach((element, index) => {
          const statusGroup = allTickets.filter((ticket) => element === ticket.status);
          filteredData.push({
            [index]: {
              title: element,
              value: statusGroup,
            },
          });
        });
      } else if (groupValue === "user") {
        user = true;
  
        allTickets?.allUser?.forEach((element, index) => {
          arr = allTickets?.allTickets?.filter(
            (ticket) => element.id === ticket.userId
          );
          console.log("Arr",arr)
          filteredData.push({
            [index]: {
              title: element.name,
              value: arr,
            },
          });
          
        });
        console.log("Tickets",filteredData)
      } else {
        const priorList = ["No priority", "Urgent", "High", "Medium", "Low"];
        const priorityListViewOrder = [0, 4, 3, 2, 1];
        priorList.forEach((element, index) => {
          arr = allTickets.filter((ticket) => index === ticket.priority);
          filteredData.push({
            [index]: {
              title: element,
              value: arr,
              priority: priorityListViewOrder[index],
            },
          });
        });
      }
  
      if (orderValue === "title") {
        filteredData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
        });
      }
  
      if (orderValue === "priority") {
        filteredData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => b.priority - a.priority);
        });
      }
      dispatch(setFilteredData(filteredData))
      dispatch(setUser(user))
     
    } catch (error) {
      console.error("Error filtering data:", error);
      dispatch(setFilteredData([]))
      dispatch(setError(error.message));
    }finally{
        dispatch(setLoading(false));
    }

    return
  };
  

  export default filterData;