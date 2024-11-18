import InProgress from "../assets/in-progress.svg";
import Done from "../assets/Done.svg";
import Todo from "../assets/To-do.svg";
import Backlog from "../assets/Backlog.svg";
import Cancelled from "../assets/Cancelled.svg"
const getStatusIcon = (status) => {
    switch (status) {
      case "Backlog":
        return <img src={Backlog} alt="Backlog" />;
      case "Todo":
        return <img src={Todo} alt="Todo" />;
      case "In progress":
        return <img src={InProgress} alt="In Progress" />;
      case "Done":
        return <img src={Done} alt="Done" />;
      case "Cancelled" : 
        return <img src={Cancelled} alt="Cancelled" />
      default:
        return null;
    }
  };

export default getStatusIcon