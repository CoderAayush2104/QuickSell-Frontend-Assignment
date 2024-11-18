import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../store/dataSlice"
import Display from "../../assets/Display.svg"
import "./navbar.css"
const Navbar = () => {
  const dispatch = useDispatch();
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const [groupValue, setGroupValue] = useState("status");
  const [orderValue, setOrderValue] = useState("priority");
  const allTickets = useSelector((state) => state.allTickets);

  const handleGroupValue = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroupValue(value);
    } else {
      setOrderValue(value);
    }
    dispatch(selectData({ group: value, allTickets, orderValue }));
  };

  return (
    <div className="top-header" >
      <div className="displayButton ">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <img src={Display}/> Display
        </button>
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Grouping</span>
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
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Ordering</span>
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
