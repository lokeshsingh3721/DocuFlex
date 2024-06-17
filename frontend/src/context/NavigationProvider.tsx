import { createContext, useContext, useState, ReactNode } from "react";
import { PageNavigation, NavigationContextType } from "../../types";

// Create the context with the correct type
const NavigationContext = createContext<NavigationContextType | null>(null);

function NavigationProvider({ children }: { children: ReactNode }) {
  const [pageNavigation, setPageNavigation] = useState<PageNavigation[] | null>(
    null
  );

  return (
    <NavigationContext.Provider value={{ pageNavigation, setPageNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    );
  }
  return context;
}

export default NavigationProvider;
