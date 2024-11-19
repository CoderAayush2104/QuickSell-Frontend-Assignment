import { useEffect, useState } from "react";
import Display from "../../assets/Display.svg";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import filterData from "../../utils/filterData";
import { updateGroup, updateOrder } from "../../store/dataSlice";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dispatch = useDispatch();

  const { allTickets, allUsers, group, order } = useSelector(
    (state) => state.data
  );

  const [groupValue, setGroupValue] = useState(group);
  const [orderValue, setOrderValue] = useState(order);

  const handleGroupValue = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroupValue(value);
      dispatch(updateGroup(value));
    } else {
      setOrderValue(value);
      dispatch(updateOrder(value));
    }
  };

  useEffect(() => {
    const ticketsData =
      groupValue === "user" ? { allTickets, allUsers } : allTickets;
    filterData(dispatch, groupValue, ticketsData, orderValue);
  }, [allTickets, allUsers, groupValue, orderValue]);

  return (
    <div className="navbar-container">
      <div className="display-button-container">
        <button
          className="display-button"
          onClick={() => setIsDropdownVisible((prev) => !prev)} // Toggle dropdown visibility
        >
          <img src={Display} /> Display
        </button>
        {isDropdownVisible && (
          <div className="dropdowns-container">
            {/* Grouping Dropdown */}
            <div className="select-group ">
              <span>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="select-style"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Ordering Dropdown */}
            <div className="select-group ">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="select-style"
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
