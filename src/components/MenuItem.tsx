type MenuItemProps = {
  icon: React.JSX.Element;
  text: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text }) => {

  return (
    <li>
      <a href="" className="flex items-center py-1 px-4 hover:bg-dark-gray focus:bg-dark-gray">
        {icon}
        <span className="ml-2">{text}</span>
      </a>
    </li>
  );
}

export default MenuItem;