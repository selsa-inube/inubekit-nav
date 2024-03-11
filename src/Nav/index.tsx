import { useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { NavLink } from "@inubekit/navlink";

import { StyledNav, StyledFooter, SeparatorLine } from "./styles";

interface INavLink {
  section: ILink[];
}

interface ILink {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface ISection {
  name: string;
  links: { [key: string]: ILink };
}

interface INavigation {
  title: string;
  sections: { [key: string]: ISection };
}

interface INav {
  navigation: INavigation;
  logoutPath: string;
  logoutTitle: string;
}

const year = new Date().getFullYear();

const Links = (props: INavLink) => {
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

const MultiSections = ({ navigation }: Pick<INav, "navigation">) => {
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

const OneSection = ({ navigation }: Pick<INav, "navigation">) => {
  const section = Object.keys(navigation.sections).join();

  return (
    <Stack direction="column">
      <Stack direction="column" justifyContent="center">
        <Links section={Object.values(navigation.sections[section].links)} />
      </Stack>
    </Stack>
  );
};

const Nav = (props: INav) => {
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
export type { INav, INavLink, ILink, ISection, INavigation };
