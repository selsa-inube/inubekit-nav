import { MdKeyboardArrowRight } from "react-icons/md";
import { IIconAppearance, Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { Grid } from "@inubekit/grid";

import { StyledLink, StyledNavList } from "./styles";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { inube } from "@inubekit/foundations";

interface INavLink {
  id: string;
  label: string;
  path: string;
  disabled?: boolean;
  selected?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: PointerEvent) => void;
}

const NavLink = (props: INavLink) => {
  const {
    id,
    label,
    path,
    disabled = false,
    selected = false,
    icon,
    onClick,
  } = props;

  const theme: typeof inube = useContext(ThemeContext);

  const selectedNavLinkAppearance =
    (theme?.nav?.link?.appearance?.selected as IIconAppearance) ||
    inube.nav.link.appearance.selected;
  const regularNavLinkAppearance =
    (theme?.nav?.link?.appearance?.regular as IIconAppearance) ||
    inube.nav.link.appearance.regular;
  return (
    <StyledNavList
      id={id}
      disabled={disabled}
      appearance={selected ? selectedNavLinkAppearance : undefined}
      selected={selected}
      onClick={onClick}
    >
      <StyledLink to={path} disabled={+disabled}>
        <Grid
          templateColumns={icon ? "auto 1fr auto" : "1fr auto"}
          gap="24px"
          padding="0 16px"
          alignItems="center"
        >
          {icon && (
            <Icon
              icon={icon}
              appearance={
                selected ? selectedNavLinkAppearance : regularNavLinkAppearance
              }
              disabled={disabled}
              size="24px"
              parentHover={!disabled && true}
            />
          )}
          <Text
            appearance={
              selected ? selectedNavLinkAppearance : regularNavLinkAppearance
            }
            type="label"
            disabled={disabled}
            textAlign="start"
            weight="bold"
          >
            {label}
          </Text>
          {!disabled && selected && (
            <Icon
              icon={<MdKeyboardArrowRight />}
              appearance={
                selected ? selectedNavLinkAppearance : regularNavLinkAppearance
              }
              size="24px"
              parentHover={!disabled && true}
            />
          )}
        </Grid>
      </StyledLink>
    </StyledNavList>
  );
};

export { NavLink };
export type { INavLink };
