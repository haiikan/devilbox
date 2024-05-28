import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import kbumnLogoPng from "../assets/kbumn-logo.png";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { realm, url, usernameHidden, login, message, isAppInitiatedAction } =
    kcContext;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={<></>}
    >
      <div className="flex flex-col justify-center h-full">
        <img
          src={kbumnLogoPng}
          alt="KBUMN Logo"
          className="self-center w-full lg:self-auto max-w-40 2xl:max-w-fit"
        />

        <h1 className="mt-10 2xl:mt-20 text-[#181C32] text-4xl 2xl:text-6xl font-bold">
          Login
        </h1>

        <p className="mt-6 text-lg font-medium 2xl:mt-8 2xl:text-xl">
          Selamat Datang Kembali! Bersiaplah untuk pengalaman yang aman dan
          mudah. Masuk untuk memulai.
        </p>

        {realm.password && (
          <form
            id="kc-form-login"
            onSubmit={onSubmit}
            action={url.loginAction}
            method="post"
            className="space-y-5 text-center mt-11"
          >
            {!usernameHidden &&
              (() => {
                const label = !realm.loginWithEmailAllowed
                  ? "username"
                  : realm.registrationEmailAsUsername
                    ? "email"
                    : "usernameOrEmail";

                const autoCompleteHelper: typeof label =
                  label === "usernameOrEmail" ? "username" : label;

                return (
                  <input
                    tabIndex={1}
                    id={autoCompleteHelper}
                    className="w-full base-input"
                    name={autoCompleteHelper}
                    defaultValue={login.username ?? ""}
                    type="text"
                    autoFocus={true}
                    autoComplete="off"
                    placeholder="Username"
                    required
                  />
                );
              })()}

            <input
              tabIndex={2}
              id="password"
              className="w-full base-input"
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              required
            />

            {message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) && (
                <div>
                  <span
                    className={clsx(
                      message.type === "error" && "text-danger",
                      message.type === "info" && "text-info",
                      message.type === "success" && "text-success",
                      message.type === "warning" && "text-warning"
                    )}
                  >
                    {message.summary}
                  </span>
                </div>
              )}

            <button
              tabIndex={3}
              id="kc-login"
              className="w-full base-btn base-btn-primary"
              type="submit"
              disabled={isLoginButtonDisabled}
            >
              Sign In
            </button>

            {realm.resetPasswordAllowed && (
              <div>
                <a
                  tabIndex={4}
                  href={"#"}
                  className="base-btn-text base-btn-text-primary"
                >
                  Lupa Password
                </a>
              </div>
            )}
          </form>
        )}
      </div>
    </Template>
  );
}
