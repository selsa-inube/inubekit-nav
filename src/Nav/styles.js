import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledNav = styled.div`
  width: 248px;
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme?.nav?.background?.color || inube.nav.background.color};
  border-right: 1px solid
    ${({ theme }) => theme?.nav?.divider?.color || inube.nav.divider.color};
`;

const StyledFooter = styled.footer`
  width: 100%;
`;

const SeparatorLine = styled.div`
  width: calc(100% - 32px);
  margin: 8px 16px;
  height: 1px;
  padding: 0px;
  background-color: ${({ theme }) =>
    theme?.nav?.divider?.color || inube.nav.divider.color};
`;

export { StyledNav, StyledFooter, SeparatorLine };
