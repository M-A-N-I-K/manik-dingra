"use client";

import { useTheme } from "next-themes";

// Must match --background in app/globals.css so fog melts into the page
export const palettes = {
  light: {
    background: "#f9f7f1",
    waterDeep: "#1b5f94",
    waterShallow: "#4fa6cf",
    foam: "#ffffff",
    sun: "#ffd27a",
    sunIntensity: 2.4,
    ambient: 1.1,
    skyLight: "#fff4dc",
    groundLight: "#3d6f8f",
  },
  dark: {
    background: "#070e18",
    waterDeep: "#04142a",
    waterShallow: "#0f3d66",
    foam: "#7fd0ff",
    sun: "#cfe3ff",
    sunIntensity: 1.3,
    ambient: 0.55,
    skyLight: "#3a5f8f",
    groundLight: "#060d18",
  },
};

export type Palette = (typeof palettes)["light"];

export function usePalette(): Palette {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? palettes.dark : palettes.light;
}
