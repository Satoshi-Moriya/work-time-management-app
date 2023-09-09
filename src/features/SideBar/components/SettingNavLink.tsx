import { NavLink } from "react-router-dom";

const DEFAULT_LINK_PROPERTIES = "p-2 mt-4 hover:bg-dark-gray";
const ACTIVE_LINK_PROPERTIES = "p-2 mt-4 bg-dark-gray font-bold";

type SettingNavLinkProps = {
  url : string;
  children: string;
};

const SettingNavLink: React.FC<SettingNavLinkProps> = ({ children, url }) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) => isActive ?  ACTIVE_LINK_PROPERTIES : DEFAULT_LINK_PROPERTIES}
    >
      {children}
    </NavLink>
  );
}

export default SettingNavLink;