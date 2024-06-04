import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { MdKeyboardArrowDown } from "react-icons/md";

const SeparatorLine = styled.div`
  width: calc(100% - 32px);
  margin: 8px 16px;
  height: 1px;
  padding: 0px;
  background-color: ${({ theme }) =>
    theme?.nav?.divider?.color || inube.nav.divider.color};
`;

const StyledAnimatedWrapper = styled.div`
  opacity: 0;
  transition: all ${(props) => props.animation.duration}s
    ${(props) => props.animation.ease};
  opacity: ${(props) => (props.open ? 1 : 0)};
`;

const StyledCollapseContainer = styled.div`
  cursor: ${({ $collapse }) => ($collapse ? "pointer" : "default")};
  & > div {
    background-color: ${({ theme, $collapse, $expanded }) =>
      $collapse && $expanded
        ? theme?.nav?.subtitle?.background?.expanded ||
          inube.nav.subtitle.background.expanded
        : theme?.nav?.background?.color || inube.nav.background.color};
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
`;

const StyledNav = styled.nav`
  width: 248px;
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme?.nav?.background?.color || inube.nav.background.color};
  border-right: 1px solid
    ${({ theme }) => theme?.nav?.divider?.color || inube.nav.divider.color};
`;

const StyledRotatingIcon = styled(MdKeyboardArrowDown)`
  transition: transform 0.2s ease-in-out;
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(180deg)" : "rotate(0deg)"};
`;

export {
  SeparatorLine,
  StyledAnimatedWrapper,
  StyledCollapseContainer,
  StyledFooter,
  StyledNav,
  StyledRotatingIcon,
};
