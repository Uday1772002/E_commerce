import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const lightTheme = {
  dark: false,
  colors: {
    primary: "#1976D2",
    secondary: "#424242",
    accent: "#FF4081",
    error: "#D32F2F",
    info: "#0288D1",
    success: "#388E3C",
    warning: "#F57C00",
    surface: "#FFFFFF",
    background: "#FAFAFA",
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: "#90CAF9",
    secondary: "#BDBDBD",
    accent: "#FF80AB",
    error: "#EF5350",
    info: "#42A5F5",
    success: "#66BB6A",
    warning: "#FFB74D",
    surface: "#121212",
    background: "#000000",
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
