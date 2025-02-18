import { FC } from "react";
import "./CheckBox.scss";

interface ICheckBoxProps {
  name: string;
  activeCharts: string;
  setActiveCharts: (arg: string) => void;
}

const CheckBox: FC<ICheckBoxProps> = ({
  name,
  activeCharts,
  setActiveCharts,
}) => {
  return (
    <li
      className="checkbox-container"
      onClick={() => {
        setActiveCharts(name);
      }}
    >
      <div
        className={
          activeCharts === name ? "checkbox checkbox_active" : "checkbox"
        }
      ></div>
      <p className="checkbox__name">{name}</p>
    </li>
  );
};

export default CheckBox;
