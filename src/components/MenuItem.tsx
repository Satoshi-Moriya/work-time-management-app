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