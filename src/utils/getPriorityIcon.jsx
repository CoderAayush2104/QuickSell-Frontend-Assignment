import HiPriority from "../assets/Img - High Priority.svg";
import LowPriority from "../assets/Img - Low Priority.svg";
import MedPriority from "../assets/Img - Medium Priority.svg";
import NoPriority from "../assets/No-Priority.svg";
import Urgent from "../assets/SVG - Urgent Priority colour.svg";

const getPriorityIcon = (priority) => {
    switch (priority) {
      case 1:
        return <img src={LowPriority} alt="Low Priority" />;
      case 2:
        return <img src={MedPriority} alt="Medium Priority" />;
      case 3:
        return <img src={HiPriority} alt="High Priority" />;
      case 4:
        return <img src={Urgent} alt="Urgent Priority" />;
      default:
        return <img src={NoPriority} alt="No Priority" />;
    }
  };

export default getPriorityIcon