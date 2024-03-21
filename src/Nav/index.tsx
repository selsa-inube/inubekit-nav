import { useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

import { StyledNav, StyledFooter, SeparatorLine } from "./styles";
import { NavLink } from "../NavLink";

interface ILinkINavLink {
  section: ILink[];
}

interface ILink {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface ILinkISection {
  name: string;
  links: { [key: string]: ILink };
}

interface ILinkINavigation {
  title: string;
  sections: { [key: string]: ILinkISection };
}

interface ILinkINav {
  navigation: ILinkINavigation;
  logoutPath: string;
  logoutTitle: string;
}

const year = new Date().getFullYear();

const Links = (props: ILinkINavLink) => {
  const { section } = props;

  const location = useLocation();
  const currentUrl = location.pathname;

  const LinkElements = section.map((sectionObject) => (
    <NavLink
      key={sectionObject.id}
      id={sectionObject.id}
      label={sectionObject.label}
      icon={sectionObject.icon}
      path={sectionObject.path}
      selected={currentUrl.startsWith(sectionObject.path)}
    />
  ));
  return <>{LinkElements} </>;
};

const MultiSections = ({ navigation }: Pick<ILinkINav, "navigation">) => {
  const sections = Object.keys(navigation.sections);

  return (
    <Stack direction="column">
      {sections.map((section) => (
        <Stack
          key={navigation.sections[section].name}
          direction="column"
          justifyContent="center"
        >
          <Text
            padding="16px"
            as="h2"
            appearance="gray"
            type="title"
            size="small"
            textAlign="start"
          >
            {navigation.sections[section].name}
          </Text>
          <Stack direction="column">
            <Links
              section={Object.values(navigation.sections[section].links)}
            />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

const OneSection = ({ navigation }: Pick<ILinkINav, "navigation">) => {
  const section = Object.keys(navigation.sections).join();

  return (
    <Stack direction="column">
      <Stack direction="column" justifyContent="center">
        <Links section={Object.values(navigation.sections[section].links)} />
      </Stack>
    </Stack>
  );
};

const Nav = (props: ILinkINav) => {
  const { navigation, logoutTitle, logoutPath } = props;

  return (
    <StyledNav>
      <Stack direction="column" justifyContent="space-between" height="100dvh">
        <Stack direction="column">
          <Text
            padding="32px 16px 16px 16px"
            as="h2"
            appearance="gray"
            type="title"
            size="small"
            textAlign="start"
          >
            {navigation.title}
          </Text>
          {Object.keys(navigation.sections).length > 1 ? (
            <MultiSections navigation={navigation} />
          ) : (
            <OneSection navigation={navigation} />
          )}
          <SeparatorLine />
          <NavLink
            id="logout"
            label={logoutTitle}
            icon={<MdLogout />}
            path={logoutPath}
          />
        </Stack>
        <StyledFooter>
          <Stack justifyContent="center">
            <Text
              type="label"
              size="medium"
              appearance="gray"
              padding="24px"
              textAlign="start"
            >
              {year} - Inube
            </Text>
          </Stack>
        </StyledFooter>
      </Stack>
    </StyledNav>
  );
};

export { Nav };
export type {
  ILinkINav,
  ILinkINavLink,
  ILink,
  ILinkISection,
  ILinkINavigation,
};
