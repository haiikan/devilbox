import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
  en: {
    alphanumericalCharsOnly: "Only alphanumerical characters",
    gender: "Gender",
  },
  fr: {
    /* spell-checker: disable */
    alphanumericalCharsOnly: "Caractère alphanumérique uniquement",
    gender: "Genre",
    /* spell-checker: enable */
  },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
