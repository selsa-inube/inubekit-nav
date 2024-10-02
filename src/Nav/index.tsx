import { useLocation } from "react-router-dom";

import { ITextAppearance, Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

import {
  StyledNav,
  StyledFooter,
  SeparatorLine,
  StyledCollapseContainer,
  StyledAnimatedWrapper,
  StyledRotatingIcon,
  StyledFooterLogoImage,
} from "./styles";
import { NavLink } from "../NavLink";
import { ILink, INavNavigation } from "./props";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { Icon } from "@inubekit/icon";
import { tokens } from "./Tokens/tokens";

interface INavAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface INav {
  navigation: INavNavigation;
  actions?: INavAction[];
  collapse?: boolean;
  footerLabel?: string;
  footerLogo?: string;
}

interface INavLink {
  section: ILink[];
}

const year = new Date().getFullYear();

const defaultAnimationValues = {
  duration: 0.2,
  ease: "ease-in-out",
};

const Links = (props: INavLink) => {
  const { section } = props;

  const location = useLocation();

  const LinkElements = section.map((sectionObject) => (
    <NavLink
      key={sectionObject.id}
      id={sectionObject.id}
      label={sectionObject.label}
      icon={sectionObject.icon}
      path={sectionObject.path}
      selected={location.pathname === sectionObject.path}
    />
  ));
  return <>{LinkElements}</>;
};

const MultiSections = ({
  navigation,
  collapse,
}: {
  navigation: INavNavigation;
  collapse: boolean;
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const theme = useContext(ThemeContext) as { nav: typeof tokens };
  const navRegularTitleAppearance =
    (theme?.nav?.subtitle?.appearance?.regular as ITextAppearance) ||
    tokens.subtitle.appearance.regular;
  const navExpandedTitleAppearance =
    (theme?.nav?.subtitle?.appearance?.expanded as ITextAppearance) ||
    tokens.subtitle.appearance.expanded;

  useEffect(() => {
    if (collapse && Object.keys(navigation.sections).length > 0) {
      setExpandedSection(
        Object.keys(navigation.sections)[0].toLocaleUpperCase(),
      );
    }
  }, [collapse, navigation.sections]);

  const toggleSection = (sectionName: string) => {
    setExpandedSection((prevSection) =>
      prevSection === sectionName ? null : sectionName,
    );
  };

  return (
    <Stack direction="column">
      {Object.keys(navigation.sections).map((section) => {
        const isExpanded = collapse
          ? expandedSection === navigation.sections[section].name
          : true;

        return (
          <Stack
            key={navigation.sections[section].name}
            direction="column"
            justifyContent="center"
          >
            <StyledCollapseContainer
              onClick={() =>
                collapse && toggleSection(navigation.sections[section].name)
              }
              $collapse={collapse}
              $expanded={isExpanded}
            >
              <Stack
                direction="row"
                alignItems="center"
                padding="16px"
                height="20px"
                justifyContent={collapse ? "space-between" : "unset"}
              >
                <Text
                  as="h2"
                  appearance={
                    collapse && isExpanded
                      ? navExpandedTitleAppearance
                      : navRegularTitleAppearance
                  }
                  type="title"
                  size="small"
                  textAlign="start"
                  weight="bold"
                >
                  {navigation.sections[section].name}
                </Text>
                {collapse && (
                  <Icon
                    appearance={
                      isExpanded
                        ? navExpandedTitleAppearance
                        : navRegularTitleAppearance
                    }
                    icon={
                      <StyledRotatingIcon $expanded={isExpanded} size="20px" />
                    }
                  />
                )}
              </Stack>
            </StyledCollapseContainer>

            <StyledAnimatedWrapper
              open={isExpanded}
              $animation={defaultAnimationValues}
            >
              {isExpanded && (
                <Stack direction="column">
                  <Links
                    section={Object.values(navigation.sections[section].links)}
                  />
                </Stack>
              )}
            </StyledAnimatedWrapper>
          </Stack>
        );
      })}
    </Stack>
  );
};

const OneSection = ({ navigation }: INav) => {
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
  const {
    navigation,
    actions,
    collapse = false,
    footerLabel = `inube - ${year}`,
    footerLogo,
  } = props;
  const theme = useContext(ThemeContext) as { nav: typeof tokens };
  const navSubtitleAppearance =
    (theme?.nav?.subtitle?.appearance?.regular as ITextAppearance) ||
    tokens.subtitle.appearance.regular;
  const navCopyrightAppearance =
    (theme?.nav?.copyright?.appearance as ITextAppearance) ||
    tokens.copyright.appearance;
  return (
    <StyledNav>
      <Stack direction="column" justifyContent="space-between" height="100dvh">
        <Stack direction="column">
          <Text
            padding="32px 16px 16px 16px"
            as="h2"
            appearance={navSubtitleAppearance}
            type="title"
            size="small"
            textAlign="start"
            weight="bold"
          >
            {navigation.title}
          </Text>
          {Object.keys(navigation.sections).length > 1 ? (
            <MultiSections navigation={navigation} collapse={collapse} />
          ) : (
            <OneSection navigation={navigation} />
          )}
          {actions && actions.length > 0 && (
            <>
              <SeparatorLine />
              {actions.map(({ id, label, icon, action }) => (
                <NavLink
                  key={id}
                  id={id}
                  label={label}
                  icon={icon}
                  onClick={action}
                />
              ))}
            </>
          )}
        </Stack>
        <StyledFooter>
          <Stack justifyContent="center" alignItems="center">
            {footerLogo ? (
              <StyledFooterLogoImage src={footerLogo} alt="" />
            ) : (
              <Text
                type="label"
                size="medium"
                appearance={navCopyrightAppearance}
                padding="24px"
                textAlign="start"
                weight="bold"
              >
                {footerLabel}
              </Text>
            )}
          </Stack>
        </StyledFooter>
      </Stack>
    </StyledNav>
  );
};

export { Nav };
export type { INav, INavAction };
