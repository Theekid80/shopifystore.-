import { useSyncExternalStore } from "react";

/**
 * A tiny localStorage-backed store for per-visitor state (cart, wishlist).
 * Renders the initial value on the server and during hydration, then the
 * saved value on the client — no hydration mismatches, no effects.
 * Storage failures (private mode, blocked storage) fall back to memory.
 */
export function createPersistentStore<T>(key: string, initial: T) {
  let state: T = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) state = JSON.parse(raw) as T;
    } catch {
      /* ignore unreadable storage */
    }
  };

  const get = () => {
    load();
    return state;
  };

  const set = (next: T | ((prev: T) => T)) => {
    load();
    state = typeof next === "function" ? (next as (prev: T) => T)(state) : next;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* memory-only fallback */
    }
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const useStore = () => useSyncExternalStore(subscribe, get, () => initial);

  return { get, set, useStore };
}
