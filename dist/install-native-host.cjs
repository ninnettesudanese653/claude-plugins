#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/install-native-host.ts
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);
var os = __toESM(require("os"), 1);
var HOST_NAME = "com.brainrotcreations.socials";
var EXTENSION_ID = "jgfgohcfkpjdldjbgbdmiijklcmnplbb";
var coordinatorPath = path.resolve(__dirname, "native-messaging-host.cjs");
function getManifestDirs() {
  const home = os.homedir();
  const platform2 = os.platform();
  switch (platform2) {
    case "darwin":
      return [
        // Chrome
        path.join(home, "Library", "Application Support", "Google", "Chrome", "NativeMessagingHosts"),
        // Chrome Canary
        path.join(home, "Library", "Application Support", "Google", "Chrome Canary", "NativeMessagingHosts"),
        // Chromium
        path.join(home, "Library", "Application Support", "Chromium", "NativeMessagingHosts"),
        // Brave
        path.join(home, "Library", "Application Support", "BraveSoftware", "Brave-Browser", "NativeMessagingHosts"),
        // Edge
        path.join(home, "Library", "Application Support", "Microsoft Edge", "NativeMessagingHosts")
      ];
    case "win32":
      const localAppData = process.env.LOCALAPPDATA || path.join(home, "AppData", "Local");
      return [
        path.join(localAppData, "Google", "Chrome", "User Data", "NativeMessagingHosts"),
        path.join(localAppData, "BraveSoftware", "Brave-Browser", "User Data", "NativeMessagingHosts"),
        path.join(localAppData, "Microsoft", "Edge", "User Data", "NativeMessagingHosts")
      ];
    case "linux":
      return [
        // Chrome
        path.join(home, ".config", "google-chrome", "NativeMessagingHosts"),
        // Chromium
        path.join(home, ".config", "chromium", "NativeMessagingHosts"),
        // Brave
        path.join(home, ".config", "BraveSoftware", "Brave-Browser", "NativeMessagingHosts"),
        // Edge
        path.join(home, ".config", "microsoft-edge", "NativeMessagingHosts")
      ];
    default:
      console.error(`[NativeHost] Unsupported platform: ${platform2}`);
      return [];
  }
}
function createManifest() {
  return {
    name: HOST_NAME,
    description: "Socials MCP Bridge - connects Claude Code MCP servers to the Socials browser extension",
    path: coordinatorPath,
    type: "stdio",
    allowed_origins: [`chrome-extension://${EXTENSION_ID}/`]
  };
}
function install() {
  const manifest = createManifest();
  const manifestJson = JSON.stringify(manifest, null, 2);
  const manifestFilename = `${HOST_NAME}.json`;
  const dirs = getManifestDirs();
  const installed = [];
  const failed = [];
  for (const dir of dirs) {
    try {
      const browserDir = path.dirname(dir);
      if (!fs.existsSync(browserDir)) {
        continue;
      }
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const manifestPath = path.join(dir, manifestFilename);
      fs.writeFileSync(manifestPath, manifestJson, "utf8");
      installed.push(manifestPath);
    } catch (err) {
      failed.push(`${dir}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  if (os.platform() !== "win32") {
    try {
      fs.chmodSync(coordinatorPath, 493);
    } catch {
    }
  }
  return { installed, failed };
}
function uninstall() {
  const manifestFilename = `${HOST_NAME}.json`;
  const dirs = getManifestDirs();
  const removed = [];
  for (const dir of dirs) {
    const manifestPath = path.join(dir, manifestFilename);
    try {
      if (fs.existsSync(manifestPath)) {
        fs.unlinkSync(manifestPath);
        removed.push(manifestPath);
      }
    } catch {
    }
  }
  return { removed };
}
var command = process.argv[2];
if (command === "uninstall" || command === "remove") {
  const { removed } = uninstall();
  if (removed.length > 0) {
    console.log(`[NativeHost] Removed ${removed.length} manifest(s):`);
    removed.forEach((p) => console.log(`  \u2713 ${p}`));
  } else {
    console.log("[NativeHost] No manifests found to remove.");
  }
} else {
  console.log(`[NativeHost] Installing native messaging host: ${HOST_NAME}`);
  console.log(`[NativeHost] Coordinator path: ${coordinatorPath}`);
  const { installed, failed } = install();
  if (installed.length > 0) {
    console.log(`[NativeHost] \u2713 Installed ${installed.length} manifest(s):`);
    installed.forEach((p) => console.log(`  ${p}`));
  }
  if (failed.length > 0) {
    console.error(`[NativeHost] \u2717 Failed ${failed.length}:`);
    failed.forEach((p) => console.error(`  ${p}`));
  }
  if (installed.length === 0 && failed.length === 0) {
    console.log("[NativeHost] No supported browsers detected. Manifest not installed.");
    console.log("[NativeHost] The WebSocket fallback will be used instead.");
  }
}
