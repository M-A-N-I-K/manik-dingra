"use client";

// Single entry point for everything three.js. All dynamic imports go through
// this module so the bundler emits one shared three.js chunk instead of one per import.
export { default as BackgroundCanvas } from "./BackgroundCanvas";
export { default as FruitCanvas } from "./FruitCanvas";
export { default as FruitView } from "./FruitView";
