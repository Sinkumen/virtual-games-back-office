import MainLoader from "@/components/MainLoader";
import NoSSRWrapper from "@/components/NoSSRWrapper";
import PageManager from "@/components/PageManager";
import { ABOL_TENANT_ID, SKY_TENANT_ID } from "@/constants/tenant";
import GameContextProvider from "@/contexts/GameContext/GameContextProvider";
import ToastContextProvider from "@/contexts/ToastContext/ToastContextProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";

const importTenantStyles = (tenantId, setThemeLoaded) => {
  if (tenantId === ABOL_TENANT_ID) {
    import(`@/styles/abol.css`)
      .then(() => {
        setThemeLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load tenant theme:", err);
        setThemeLoaded(true);
      });
  } else if (tenantId === SKY_TENANT_ID) {
    import(`@/styles/sky.css`)
      .then(() => {
        setThemeLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load tenant theme:", err);
        setThemeLoaded(true);
      });
  } else {
    setThemeLoaded(true);
  }
};

export default function App({ Component, pageProps }) {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    importTenantStyles(tenantId, setThemeLoaded);
  }, [tenantId]);

  if (!themeLoaded) {
    return <MainLoader />;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        notifyOnChangeProps: "all",
      },
      mutations: {
        retry: false,
        notifyOnChangeProps: "all",
      },
    },
  });
  return (
    <NoSSRWrapper>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContextProvider>
            <PageManager>
              <GameContextProvider>
                <Component {...pageProps} />
              </GameContextProvider>
            </PageManager>
          </ToastContextProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </NoSSRWrapper>
  );
}
