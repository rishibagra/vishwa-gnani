import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        about: "About Us",
        members: "Members",
        programs: "Programs",
        events: "Events",
        contact: "Contact",
        admin: "Admin Dashboard",
        login: "Login / Signup",
        logout: "Logout"
      }
    }
  },
  kn: {
    translation: {
      navbar: {
        home: "ಮುಖಪುಟ",
        about: "ನಮ್ಮ ಬಗ್ಗೆ",
        members: "ಸದಸ್ಯರು",
        programs: "ಕಾರ್ಯಕ್ರಮಗಳು",
        events: "ಸಮಾರಂಭಗಳು",
        contact: "ಸಂಪರ್ಕಿಸಿ",
        admin: "ಆಡಳಿತ ಮಂಡಳಿ",
        login: "ಲಾಗಿನ್ / ಸೈನ್ ಅಪ್",
        logout: "ನಿರ್ಗಮಿಸಿ"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;