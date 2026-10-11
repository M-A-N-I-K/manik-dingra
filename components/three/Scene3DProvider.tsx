"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

// 3D is enabled only on tablet/desktop widths, when the user hasn't asked for
// reduced motion, and when the browser can create a WebGL2 context.
// Everything else gets the flat 2D theme.
const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

let webglSupported: boolean | undefined;
function hasWebGL() {
  if (webglSupported === undefined) {
    try {
      webglSupported = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      webglSupported = false;
    }
  }
  return webglSupported;
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getSnapshot = () => window.matchMedia(QUERY).matches && hasWebGL();
// null = not decided yet (server render / before hydration)
const getServerSnapshot = () => null;

const Scene3DContext = createContext<boolean | null>(null);

export function Scene3DProvider({ children }: { children: React.ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <Scene3DContext.Provider value={enabled}>{children}</Scene3DContext.Provider>;
}

export const useCan3D = () => useContext(Scene3DContext);
