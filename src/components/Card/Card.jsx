import "./card.css";
import { useSelector } from "react-redux";
import getStatusIcon from "../../utils/getStatusIcon";
import getPriorityIcon from "../../utils/getPriorityIcon";
import User from "../../assets/User.svg";
import UrgentGray from "../../assets/SVG - Urgent Priority grey.svg";
const Card = ({ id, title, tag, status, priority }) => {
  // Get group value from Redux store
  const group = useSelector((state) => state.data.group);

  return (
    <div className="card-container ">
      <div className="card-heading ">
        <span className="card-id">{id}</span>
        <div className="image-container">
          <div className="dot"></div>
          {group !== "user" && <img src={User} alt="UserImage" />}
        </div>
      </div>
      <div className="card-title">
        {group !== "status" && getStatusIcon(status)}
        <span>{title}</span>
      </div>
      <div className="card-tags">
        {group !== "priority" && (
          <div className="tags ">
            {priority === 4 ? (
              <img src={UrgentGray} />
            ) : (
              getPriorityIcon(priority)
            )}
          </div>
        )}
        {tag?.map((element, index) => (
          <div key={index} className="tags ">
            <span>•</span> {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
