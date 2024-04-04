import { BrowserRouter } from "react-router-dom";
import { MdHouse } from "react-icons/md";

import { NavLinkController } from "./NavLink.Controller";
import { props, parameters } from "../props";
import { NavLink, INavLink } from "..";

const story = {
  title: "navigation/NavLink",
  components: NavLink,
  parameters,
  argTypes: props,
  decorators: [
    (Story: React.ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = (args: INavLink) => <NavLinkController {...args} />;

Default.args = {
  id: "privileges",
  label: "Privileges",
  path: "/privileges",
  disabled: false,
  icon: <MdHouse />,
};

export { Default };
export default story;
