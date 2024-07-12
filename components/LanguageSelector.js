import React from 'react';
import { useRouter } from 'next/router';
import DarkModeToggle from './DarkModeToggle';

const LanguageSelector = () => {
  const router = useRouter();

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className="control-buttons">
      <DarkModeToggle />
      <button className="control-button language-button" onClick={() => changeLanguage('en')} aria-label="Switch to English">🇺🇸</button>
      <button className="control-button language-button" onClick={() => changeLanguage('es')} aria-label="Cambiar a Español">🇪🇸</button>
      <button className="control-button language-button" onClick={() => changeLanguage('ht')} aria-label="Chanje an Kreyòl Ayisyen">🇭🇹</button>
      <button className="control-button language-button" onClick={() => changeLanguage('vi')} aria-label="Chuyển sang tiếng Việt">🇻🇳</button>
    </div>
  );
};

export default LanguageSelector;