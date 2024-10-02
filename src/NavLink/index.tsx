import { MdKeyboardArrowRight } from "react-icons/md";
import { IIconAppearance, Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { Grid } from "@inubekit/grid";

import { StyledAction, StyledLink, StyledNavList } from "./styles";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { tokens } from "../Nav/Tokens/tokens";

interface INavLink {
  id: string;
  label: string;
  path?: string;
  disabled?: boolean;
  selected?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; // Changed to handle mouse event
}

const renderLinkContent = ({
  icon,
  label,
  selected,
  disabled,
  selectedNavLinkAppearance,
  regularNavLinkAppearance,
}: {
  icon?: React.ReactNode;
  label: string;
  selected: boolean;
  disabled: boolean;
  selectedNavLinkAppearance: IIconAppearance;
  regularNavLinkAppearance: IIconAppearance;
}) => (
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
      />
    )}
  </Grid>
);

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

  const theme = useContext(ThemeContext) as { nav: typeof tokens };

  const selectedNavLinkAppearance =
    (theme?.nav?.link?.appearance?.selected as IIconAppearance) ||
    tokens.link.appearance.selected;
  const regularNavLinkAppearance =
    (theme?.nav?.link?.appearance?.regular as IIconAppearance) ||
    tokens.link.appearance.regular;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick && !path) {
      e.preventDefault();
    }
    try {
      onClick && onClick(e);
    } catch (error) {
      console.error(`Error executing onClick for ${id}:`, error);
    }
  };

  return (
    <StyledNavList
      id={id}
      $disabled={disabled}
      $appearance={selected ? selectedNavLinkAppearance : undefined}
      $selected={selected}
      onClick={handleClick}
    >
      {path ? (
        <StyledLink to={path} $disabled={+disabled}>
          {renderLinkContent({
            icon,
            label,
            selected,
            disabled,
            selectedNavLinkAppearance,
            regularNavLinkAppearance,
          })}
        </StyledLink>
      ) : (
        <StyledAction $disabled={+disabled}>
          {renderLinkContent({
            icon,
            label,
            selected,
            disabled,
            selectedNavLinkAppearance,
            regularNavLinkAppearance,
          })}
        </StyledAction>
      )}
    </StyledNavList>
  );
};

export { NavLink };
export type { INavLink };
