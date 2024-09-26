import { inube } from "@inubekit/foundations";

const tokens = {
  background: {
    color: inube.palette.neutral.N10,
  },
  divider: {
    color: inube.palette.neutral.N40,
  },
  title: {
    appearance: "gray",
  },
  subtitle: {
    appearance: {
      regular: "gray",
      expanded: "primary",
    },
    background: {
      expanded: inube.palette.neutral.N30,
    },
  },
  link: {
    appearance: {
      regular: "dark",
      selected: "primary",
    },
    background: {
      selected: inube.palette.neutral.N30,
      hover: inube.palette.neutral.N30,
    },
  },
  copyright: {
    appearance: "gray",
  },
};

export { tokens };
