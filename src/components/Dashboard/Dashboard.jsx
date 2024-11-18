import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import Card from "../Card/Card";
import User from "../../assets/User.svg"
import getStatusIcon from './../../utils/getStatusIcon';
import fetchData from "../../utils/fetchData";
import getPriorityIcon from "../../utils/getPriorityIcon";

const Dashboard = () => {
  // Get group and order values from Redux store
  const dispatch = useDispatch()
  
  const { filteredData, user,group } = useSelector((state) => state.data);


  useEffect(() => {
    fetchData(dispatch)
  }, []);

  return (
    filteredData && (
      <div className="dashContainer" >
        {filteredData.map((element, index) => {
          // Determine the title and value for each group in filteredData
          const { priority,title, value } = element[index];
         
          return (
            <div key={index} className="dashColumn" >
              <div className="dashColHeading ">
                <div className="leftHeading ">
                  {user ? (
                    <div className="dashCardImageContainer">
                      <img src={User}/>
                    </div>
                  ) : group === 'status' ? (
                    <>
                    {getStatusIcon(title)}
                    </>
                  ) : (
                    <>
                    {getPriorityIcon(priority)}
                    </>
                  )}
                  <span>
                    {title} 
                  </span>
                  <span className="titleValue">
                  {value?.length}
                  </span>
                </div>
                <div className="rightHeading">
                  <span>
                  +
                  </span>
                   <span>...</span>
                </div>
              </div>
              <div className="dashList ">
                {value?.map((ticket, ind) => (
                  <Card
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    tag={ticket.tag}
                    status={ticket.status}
                    priority={ticket.priority}
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Conditionally render Done and Canceled sections only when grouping is by status */}
        {group === 'status'  && (
          <>
          <div className="dashColumn">
          <div className="dashColHeading ">
              <div className="leftHeading">
                <div className="cardTitle" >
                  {getStatusIcon('Done')}
                </div>
                <span >Done</span> <span className="titleValue">0</span>
              </div>
              <div className="rightHeading">
                  <span>
                  +
                  </span>
                   <span>...</span>
                </div>
            </div>
          </div>
          <div className="dashColumn">
          <div className="dashColHeading ">
              <div className="leftHeading" >
                <div className="cardTitle" >
                  {getStatusIcon('Cancelled')}
                </div>
                <span >Cancelled</span> <span className="titleValue">0</span>
              </div>
              <div className="rightHeading">
                  <span>
                  +
                  </span>
                   <span>...</span>
                </div>
            </div>
          </div>
           
           
          </>
        )}
      </div>
    )
  );
};

export default Dashboard;