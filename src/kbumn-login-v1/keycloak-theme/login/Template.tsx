import { useEffect } from "react";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import bgImageJpg from "./assets/background.jpg";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, children } = props;

  const { locale } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    htmlClassName: undefined,
    bodyClassName: undefined,
    htmlLangProperty: locale?.currentLanguageTag,
    documentTitle: i18n.msgStr("loginTitle", kcContext.realm.displayName),
  });

  useEffect(() => {
    console.log(
      `Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`
    );
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className="h-screen lg:grid-cols-12 lg:grid">
      <div
        className="hidden h-screen bg-gray-100 bg-bottom bg-no-repeat bg-cover lg:col-span-7 3xl:col-span-9 lg:block"
        style={{ backgroundImage: `url(${bgImageJpg})` }}
      ></div>
      <div className="p-4 bg-white portrait:h-screen lg:h-screen lg:col-span-5 3xl:col-span-3 md:p-14">
        {children}
      </div>
    </div>
  );
}
