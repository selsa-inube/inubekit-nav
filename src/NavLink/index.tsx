import { MdKeyboardArrowRight } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { Grid } from "@inubekit/grid";

import { StyledLink, StyledNavList } from "./styles";

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

  return (
    <StyledNavList
      id={id}
      disabled={disabled}
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
              appearance={selected ? "primary" : "dark"}
              disabled={disabled}
              size="24px"
              parentHover={!disabled && true}
            />
          )}
          <Text
            appearance={selected ? "primary" : "dark"}
            type="label"
            disabled={disabled}
            textAlign="start"
          >
            {label}
          </Text>
          {!disabled && selected && (
            <Icon
              icon={<MdKeyboardArrowRight />}
              appearance={selected ? "primary" : "dark"}
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
