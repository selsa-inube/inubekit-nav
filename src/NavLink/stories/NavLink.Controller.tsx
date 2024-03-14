import { useState } from "react";
import { NavLink, INavLink } from "..";

const NavLinkController = (props: INavLink) => {
  const [select, setSelect] = useState(false);

  const onClick = () => {
    setSelect(true);
  };

  return (
    <ul>
      <NavLink {...props} selected={select} onClick={onClick} />
    </ul>
  );
};

export { NavLinkController };
