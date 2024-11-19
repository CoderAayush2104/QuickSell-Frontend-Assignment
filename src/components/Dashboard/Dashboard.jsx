import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import Card from "../Card/Card";
import User from "../../assets/User.svg";
import getStatusIcon from "./../../utils/getStatusIcon";
import fetchData from "../../utils/fetchData";
import getPriorityIcon from "../../utils/getPriorityIcon";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { filteredData, user, group } = useSelector((state) => state.data);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    filteredData && (
      <div className="dash-container">
        {filteredData.map((element, index) => {
          const { priority, title, value } = element[index];

          return (
            <div key={index} className="dash-column">
              <div className="dash-col-heading ">
                <div className="left-heading ">
                  {user ? (
                    <div className="dash-col-heading-image-container">
                      <img src={User} />
                    </div>
                  ) : group === "status" ? (
                    <>{getStatusIcon(title)}</>
                  ) : (
                    <>{getPriorityIcon(priority)}</>
                  )}
                  <span>{title}</span>
                  <span className="title-value">{value?.length}</span>
                </div>
                <div className="right-heading">
                  <span>+</span>
                  <span>...</span>
                </div>
              </div>
              <div className="dash-list ">
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
        {group === "status" && (
          <>
            <div className="dash-column">
              <div className="dash-col-heading ">
                <div className="left-heading">
                  <div className="card-title">{getStatusIcon("Done")}</div>
                  <span>Done</span> <span className="title-value">0</span>
                </div>
                <div className="right-heading">
                  <span>+</span>
                  <span>...</span>
                </div>
              </div>
            </div>
            <div className="dash-column">
              <div className="dash-col-heading ">
                <div className="left-heading">
                  <div className="card-title">{getStatusIcon("Cancelled")}</div>
                  <span>Cancelled</span> <span className="title-value">0</span>
                </div>
                <div className="right-heading">
                  <span>+</span>
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
