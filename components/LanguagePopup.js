import React from 'react';
import { useRouter } from 'next/router';

const LanguagePopup = ({ onClose }) => {
  const router = useRouter();

  const selectLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
    localStorage.setItem('language', lang);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Select Your Language / Seleccione su idioma / Chwazi Lang Ou / Chọn ngôn ngữ của bạn</h2>
        <div className="language-buttons">
          <button onClick={() => selectLanguage('en')}>English 🇺🇸</button>
          <button onClick={() => selectLanguage('es')}>Español 🇪🇸</button>
          <button onClick={() => selectLanguage('ht')}>Kreyòl Ayisyen 🇭🇹</button>
          <button onClick={() => selectLanguage('vi')}>Tiếng Việt 🇻🇳</button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;