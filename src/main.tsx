import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext as kcLoginExampleThemeContext } from "./login-example/kcContext";
import { kcContext as kcAccountThemeContext } from "./account/kcContext";

import { kcContext as kcLoginV4ThemeContext } from "./login-v4/kcContext";
import "./tailwind.css";

const KcLoginExampleThemeApp = lazy(() => import("./login-example/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

const KcLoginV4ThemeApp = lazy(() => import("./login-v4/KcApp"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      {(() => {
        if (kcLoginExampleThemeContext !== undefined) {
          return <KcLoginExampleThemeApp kcContext={kcLoginExampleThemeContext} />;
        }

        if (kcAccountThemeContext !== undefined) {
          return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
        }

        if (kcLoginV4ThemeContext !== undefined) {
          return <KcLoginV4ThemeApp kcContext={kcLoginV4ThemeContext} />;
        }

        throw new Error(
          "This app is a Keycloak theme" +
            "It isn't meant to be deployed outside of Keycloak"
        );
      })()}
    </Suspense>
  </StrictMode>
);
