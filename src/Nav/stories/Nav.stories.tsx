import { BrowserRouter } from "react-router-dom";
import {
  MdKey,
  MdMeetingRoom,
  MdPhone,
  MdBadge,
  MdStarBorder,
  MdAccountBalance,
  MdAccountBalanceWallet,
} from "react-icons/md";

import { Nav, INav } from "..";

import { props, parameters } from "../props";

const story = {
  title: "navigation/Nav",
  components: Nav,
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

const Default = (args: INav) => <Nav {...args} />;

Default.args = {
  navigation: {
    title: "MENU",
    sections: {
      administrate: {
        name: "Administrate",
        links: {
          text: {
            id: "text",
            label: "Text",
            icon: <MdKey />,
            path: "/components/text",
          },
          textfield: {
            id: "textfield",
            label: "Textfield",
            icon: <MdMeetingRoom />,
            path: "/components/textfield",
          },
          textarea: {
            id: "textarea",
            label: "Textarea",
            icon: <MdPhone />,
            path: "/components/textarea",
          },
          crm: {
            id: "crm",
            label: "CRM",
            icon: <MdStarBorder />,
            path: "/crm",
          },
        },
      },
      request: {
        name: "Request",
        links: {
          documents: {
            id: "documents",
            label: "Documents",
            icon: <MdBadge />,
            path: "/documents",
          },
          marketing: {
            id: "marketing",
            label: "Marketing",
            icon: <MdStarBorder />,
            path: "/marketing",
          },
          savings: {
            id: "savings",
            label: "Savings",
            icon: <MdAccountBalanceWallet />,
            path: "/savings",
          },
          credit: {
            id: "credit",
            label: "Credit",
            icon: <MdAccountBalance />,
            path: "/credit",
          },
        },
      },
    },
  },
  logoutPath: "/logout",
  logoutTitle: "logout",
};

export { Default };
export default story;
