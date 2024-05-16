interface ILink {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface INavSection {
  name: string;
  links: { [key: string]: ILink };
}

interface INavNavigation {
  title: string;
  sections: { [key: string]: INavSection };
}

const parameters = {
  layout: "fullscreen",
  docs: {
    description: {
      component:
        "A versatile side navigation component, which allows you to nest links",
    },
  },
};

const props = {
  navigation: {
    description:
      "The primary object that will organize and store the requisite paths for the correct operation of the Nav component is forthcoming and is required",
  },
  logoutPath: {
    description:
      "is the path where the user is going to navigate when he wants to logout and is required",
  },
  logoutTitle: {
    description:
      "is the title for the path where the user is going to navigate when he wants to logout and is required",
  },
  collapse: {
    description:
      "indicates if the component should be collapsible or not (by default is false)",
  },
};

export { parameters, props };
export type { ILink, INavSection, INavNavigation };
