import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: "#00B96D",
        secondary: "#FFD000",
      },
      fontFamily: {
        "dm-serif": ["DM Serif Text", "serif"],
        outfit: ["Outfit", "serif"],
      },
      backgroundImage: {
        "hero-img": "url('./img/hero.svg')",
        "hero-drop": "url('./img/hero-drop.svg')",
      },
      dropShadow: {
        card: "0 4px 4px #D9D9D9",
        active: "0 8px 8px #D9D9D9",
      },
    },
  },
};
