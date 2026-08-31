import { BsPencilSquare } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import InfoCard from "../components/InfoCard";

const InfoWrapper = () => {
  const infoCardIconStyle = {
    primary: "bg-primary-100/80 text-primary-600",
    danger: "bg-danger-100/80 text-danger-600",
    warning: "bg-warning-100/80 text-warning-600",
    success: "bg-success-100/80 text-success-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <InfoCard
        count={200}
        title="Total Tasks"
        icon={BsPencilSquare}
        style={infoCardIconStyle.primary}
      />
      <InfoCard
        count={190}
        title="Total Tasks"
        icon={FaRegClock}
        style={infoCardIconStyle.danger}
      />
      <InfoCard
        count={450}
        title="Total Tasks"
        icon={BsPencilSquare}
        style={infoCardIconStyle.warning}
      />
      <InfoCard
        count={20}
        title="Total Tasks"
        icon={BsPencilSquare}
        style={infoCardIconStyle.success}
      />
    </div>
  );
};

export default InfoWrapper;
