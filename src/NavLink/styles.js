import styled from "styled-components";
import { Link } from "react-router-dom";

import { inube } from "@inubekit/foundations";

const StyledNavList = styled.li`
  display: flex;
  align-items: center;
  list-style-type: none;
  width: 100%;
  min-width: 180px;
  min-height: 40px;
  box-sizing: border-box;
  border-left: ${({ appearance, disabled, theme }) => {
    if (appearance && !disabled) {
      return `5px solid ${
        theme?.nav?.[appearance]?.content?.color?.regular ||
        inube.text[appearance].content.color.regular
      }`;
    }
    return `5px solid transparent`;
  }};
  background-color: ${({ selected, disabled, theme }) => {
    if (disabled) {
      return (
        theme?.nav?.link?.background?.selected ||
        inube.nav.link.background.selected
      );
    }
    if (selected && !disabled) {
      return (
        theme?.nav?.link?.background?.selected ||
        inube.nav.link.background.selected
      );
    }
  }};

  ${({ disabled, theme }) =>
    !disabled &&
    `
      &:hover {
        background-color: ${
          theme?.nav?.link?.background?.hover || inube.nav.link.background.hover
        };     
      }
  `};
`;

const StyledLink = styled(Link)`
  box-sizing: border-box;
  text-decoration: none;
  width: 100%;
  cursor: ${({ disabled }) => disabled && "not-allowed"};
`;

export { StyledNavList, StyledLink };
