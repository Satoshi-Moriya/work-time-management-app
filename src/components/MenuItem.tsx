// import { RxTimer } from "react-icons/rx";
// import { ImTable2 } from "react-icons/im";
// import { IoSettingsSharp } from "react-icons/io5";
// import { IconType } from "react-icons";

type MenuItemProps = {
  icon: React.JSX.Element;
  text: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text }) => {

  return (
    <li>
      <a href="" className="flex items-center">
        {icon}
        <span className="ml-3">{text}</span>
      </a>
    </li>
  );
}

export default MenuItem;