import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

function createStorage(): Storage {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },
    clear() {
      store = {};
    },
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key)
        ? store[key]
        : null;
    },
    key(index) {
      return Object.keys(store)[index] ?? null;
    },
    removeItem(key) {
      delete store[key];
    },
    setItem(key, value) {
      store[key] = String(value);
    },
  };
}

if (
  typeof localStorage === "undefined" ||
  typeof localStorage.setItem !== "function"
) {
  Object.defineProperty(globalThis, "localStorage", {
    value: createStorage(),
    configurable: true,
  });
}

afterEach(() => {
  cleanup();
  localStorage.clear();
});
