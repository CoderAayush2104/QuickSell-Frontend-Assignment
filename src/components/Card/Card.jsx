import "./Card.css";
import { useSelector } from "react-redux";

import getStatusIcon from "../../utils/getStatusIcon";
import getPriorityIcon from "../../utils/getPriorityIcon";
import User from "../../assets/User.svg"
const Card = ({ id, title, tag, status, priority }) => {
  // Get group value from Redux store
  const group = useSelector((state) => state.data.group);

  return (
    <div className="cardContainer ">
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div className="imageContainer" >
        {group !== "user" && 
          <img
            src={User}
            alt="UserImage"
          />}
        </div>
      </div>
      <div className="cardTitle" >
        {group !== "status" && getStatusIcon(status)}
        <span>{title}</span>
      </div>
      <div className="cardTags">
        {group !== "priority" && (
          <div className="tags color-grey">{getPriorityIcon(priority)}</div>
        )}
        {tag?.map((element, index) => (
          <div key={index} className="tags color-grey">
            <span>•</span> {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;