import { Link } from "react-router-dom";

type MenuItemProps = {
  icon: React.JSX.Element;
  text: string;
  url: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, url }) => {

  return (
    <li>
      <Link to={url} className="flex items-center py-1 px-4 hover:bg-dark-gray focus:bg-dark-gray">
        {icon}
        <span className="ml-2">{text}</span>
      </Link>
    </li>
  );
}

export default MenuItem;