import { NavLink } from "react-router-dom";

const DEFAULT_LINK_PROPERTIES = "flex items-center py-1 px-4 hover:bg-dark-gray";
const ACTIVE_LINK_PROPERTIES = "flex items-center py-1 px-4 bg-dark-gray font-bold";

type MenuItemProps = {
  icon: React.JSX.Element;
  text: string;
  url: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, url }) => {

  return (
    <li>
      <NavLink
        to={url}
        className={({ isActive }) => isActive ? ACTIVE_LINK_PROPERTIES : DEFAULT_LINK_PROPERTIES}
      >
        {icon}
        <span className="ml-2">{text}</span>
      </NavLink>
    </li>
  );
}

export default MenuItem;