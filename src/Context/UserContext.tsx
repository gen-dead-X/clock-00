import type React from 'react';
import { type ReactNode, createContext, useEffect, useMemo, useState } from 'react';

type UserContext = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  layoutStyles: { isGrid: boolean };
  setLayoutStyles: React.Dispatch<React.SetStateAction<{ isGrid: boolean }>>;
};

export const UserContext = createContext<UserContext>({
  darkMode: false,
  setDarkMode: () => {
    throw new Error('Function not implemented.');
  },
  layoutStyles: { isGrid: true },
  setLayoutStyles: () => {
    throw new Error('Function Not implemented.');
  },
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [layoutStyles, setLayoutStyles] = useState({ isGrid: true });

  /* Theme Toggling Function */

  function setDark() {
    document.querySelector('body')?.classList.add('dark');
    setDarkMode(true);
    localStorage.setItem('dark', 'true');

    return;
  }

  function setLight() {
    document.querySelector('body')?.classList.remove('dark');
    localStorage.setItem('dark', 'false');
    setDarkMode(false);

    return;
  }

  useEffect(() => {
    /* Get Preferred Layout */
    function getPreferredLayout() {
      const layoutStyles = JSON.parse(localStorage.getItem('layoutStyles') ?? 'false');

      if (layoutStyles) {
        setLayoutStyles(layoutStyles);
      }
    }

    /* Getting User Preferred Theme */
    function getTheme() {
      const dark = localStorage.getItem('dark');
      const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (!dark) {
        if (isDarkPreferred) {
          setDark();
        } else {
          setLight();
        }
        return;
      }

      if (dark === 'true') {
        setDark();
        return;
      }

      setLight();
    }

    getTheme();
    getPreferredLayout();
  }, []);

  /* Theme Toggling Function */

  const context: UserContext = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      layoutStyles,
      setLayoutStyles,
    }),
    [darkMode, layoutStyles],
  );

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};
