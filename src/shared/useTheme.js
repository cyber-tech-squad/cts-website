import { useSyncExternalStore } from "react";

// Le choix « mode hacker » est partagé par toutes les pages :
// on le garde dans une petite "boîte" commune + dans le navigateur (localStorage).
const KEY = "cts-theme";
const listeners = new Set();

function read() {
  try {
    return localStorage.getItem(KEY) === "hacker";
  } catch {
    return false; // le navigateur refuse l'accès : on reste en mode clair
  }
}

let hacker = read();

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function setHacker(value) {
  hacker = value;
  try {
    localStorage.setItem(KEY, value ? "hacker" : "clair");
  } catch {
    // pas grave si on ne peut pas mémoriser
  }
  listeners.forEach((callback) => callback()); // prévient tous les composants
}

// Utilisation : const [hacker, setHacker] = useHacker();
export function useHacker() {
  const value = useSyncExternalStore(subscribe, () => hacker, () => false);
  return [value, setHacker];
}
