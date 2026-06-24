import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import t, { LangCode, Translations } from "./translations";

type LanguageContextType = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  T: Translations;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  T: t["fr"],
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("fr");

  const setLang = (l: LangCode) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.documentElement.lang = "fr";
    document.documentElement.dir = "ltr";
  }, []);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, T: t[lang], isRTL: lang === "ar" }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
