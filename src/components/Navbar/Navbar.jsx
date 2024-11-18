import { useEffect, useState } from "react";
import Display from "../../assets/Display.svg";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import filterData from "../../utils/filterData";
import { updateGroup, updateOrder } from "../../store/dataSlice";

const Navbar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();

  // Access persisted state from Redux
  const { allTickets, allUser, group, order } = useSelector((state) => state.data);

  // Local state mirrors persisted Redux state
  const [groupValue, setGroupValue] = useState(group);
  const [orderValue, setOrderValue] = useState(order);

  const handleGroupValue = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroupValue(value);
      dispatch(updateGroup(value)); // Update group in Redux state
    } else {
      setOrderValue(value);
      dispatch(updateOrder(value)); // Update order in Redux state
    }
  };

  useEffect(() => {
    const ticketsData = groupValue === "user" ? { allTickets, allUser } : allTickets;
    console.log(ticketsData)
   filterData(dispatch,groupValue, ticketsData, orderValue);
  }, [allTickets, allUser, groupValue, orderValue]);

  return (
    <div className="top-header">
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick((prev) => !prev)} // Toggle dropdown visibility
        >
          <img src={Display} /> Display
        </button>
        {displayOnClick && (
          <div className="dropOnClick p-10">
            {/* Grouping Dropdown */}
            <div className="selectGroup ">
              <span >Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Ordering Dropdown */}
            <div className="selectGroup ">
              <span >Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;