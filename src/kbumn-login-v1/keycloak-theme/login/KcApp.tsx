import { lazy, Suspense } from "react";
import Fallback from "keycloakify/login";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Template from "./Template";

const Login = lazy(() => import("./pages/Login"));
const Info = lazy(() => import("keycloakify/login/pages/Info"));

export default function KcApp(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const i18n = useI18n({ kcContext });

  if (i18n === null) {
    // NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
    // We could display a loading progress but it's usually a matter of milliseconds.
    return null;
  }

  /*
   * Examples assuming i18n.currentLanguageTag === "en":
   * i18n.msg("access-denied") === <span>Access denied</span>
   * i18n.msg("foo") === <span>foo in English</span>
   */

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <Login
                {...{ kcContext, i18n, Template }}
                doUseDefaultCss={true}
              />
            );
          case "info.ftl":
            return (
              <Info
                {...{ kcContext, i18n }}
                Template={lazy(() => import("keycloakify/login/Template"))}
                doUseDefaultCss={true}
              />
            );
          default:
            return (
              <Fallback
                {...{ kcContext, i18n }}
                Template={Template}
                doUseDefaultCss={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
