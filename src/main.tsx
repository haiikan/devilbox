import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
// import { kcContext as kcLoginExampleThemeContext } from "./login-example/kcContext";
// import { kcContext as kcAccountExampleThemeContext } from "./account-example/kcContext";

import { kcContext as kcLoginV1ThemeContext } from "./kbumn-login-v1/keycloak-theme/login/kcContext";
import "./tailwind.css";

// const KcLoginExampleThemeApp = lazy(() => import("./login-example/KcApp"));
// const KcAccountExampleThemeApp = lazy(() => import("./account-example/KcApp"));

const KcLoginV1ThemeApp = lazy(
  () => import("./kbumn-login-v1/keycloak-theme/login/KcApp")
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      {(() => {
        // if (kcLoginExampleThemeContext !== undefined) {
        //   return (
        //     <KcLoginExampleThemeApp kcContext={kcLoginExampleThemeContext} />
        //   );
        // }

        // if (kcAccountExampleThemeContext !== undefined) {
        //   return (
        //     <KcAccountExampleThemeApp
        //       kcContext={kcAccountExampleThemeContext}
        //     />
        //   );
        // }

        if (kcLoginV1ThemeContext !== undefined) {
          return <KcLoginV1ThemeApp kcContext={kcLoginV1ThemeContext} />;
        }

        throw new Error(
          "This app is a Keycloak theme" +
            "It isn't meant to be deployed outside of Keycloak"
        );
      })()}
    </Suspense>
  </StrictMode>
);
