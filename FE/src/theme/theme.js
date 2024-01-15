import { createTheme } from "@mui/material";

// we still need to add arabic and english mode because arabic is writen from right to left

export const tokens = () => {
  return {
    primary: {
      100: "#df7f7f",
      200: "#d96a6a",
      300: "#d45555",
      400: "#ce3f3f",
      500: "#C92A2A",
      600: "#b52626",
      700: "#a12222",
      800: "#8d1d1d",
      900: "#791919",
    },

    secondary: {
      50: "#F8F9FA",
      100: "#85898c",
      200: "#717579",
      300: "#5d6166",
      400: "#484e53",
      500: "#343A40",
      600: "#2f343a",
      700: "#2a2e33",
      800: "#24292d",
      900: "#1f2326",
    },
  };
};

const themeSittings = () => {
  const colors = tokens();

  return {
    palette: {
      primary: {
        main: colors.primary[500],
        light: colors.primary[300],
        dark: colors.primary[800],
      },
      secondary: {
        main: colors.secondary[500],
        light: colors.secondary[300],
        dark: colors.secondary[800],
      },
      text: {
        primary: "#212529",
      },
    },
    typography: {
      fontFamily: ["Raleway", " sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Raleway", " sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Raleway", " sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Raleway", " sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Raleway", " sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Raleway", " sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Raleway", " sans-serif"].join(","),
        fontSize: 14,
      },
      cardTitle: {
        color: "#FFFFFF",
        fontWeight: 500,
        fontFamily: "Raleway",
        fontStyle: "normal",
        fontSize: 34,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1550,
      },
    },
  };
};

const theme = createTheme(themeSittings());

export default theme;
