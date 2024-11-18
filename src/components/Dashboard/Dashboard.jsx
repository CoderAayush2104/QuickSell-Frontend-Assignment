import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DashBoard.css";
import Card from "../Card/Card";
import { fetchAllData } from "../../store/dataSlice";
import User from "../../assets/User.svg"
import getStatusIcon from './../../utils/getStatusIcon';

const Dashboard = () => {
  // Get group and order values from Redux store
  const dispatch = useDispatch()
  const { selectedData, user } = useSelector((state) => state.selectData);
  const {group } = useSelector((state) => state.data)
  
  useEffect(() => {
    dispatch(fetchAllData()); 
  }, [dispatch]);
  console.log(user)
  return (
    selectedData && (
      <div className="dashContainer" >
        {selectedData.map((element, index) => {
          // Determine the title and value for each group in selectedData
          const { title, value } = element[index];
          
          return (
            <div key={index} className="dashCardContainer" >
              <div className="dashCardHeading flex-sb">
                <div className="leftHeading ">
                  {user ? (
                    <div className="dashCardImageContainer">
                      <img src={User}/>
                    </div>
                  ) : (
                    <>
                    {getStatusIcon(title)}
                  
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
          <div className="dashCardContainer">
          <div className="dashCardHeading ">
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
          <div className="dashCardContainer">
          <div className="dashCardHeading flex-sb">
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