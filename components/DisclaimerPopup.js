import React from 'react';
import { useTranslation } from 'next-i18next';

const DisclaimerPopup = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{t('Important Disclaimer')}</h2>
        <p>{t('This is an experimental app designed to help parents calculate insulin doses for their children. Always consult with your pediatric endocrinologist before making any changes to insulin regimens.')}</p>
        <button onClick={onClose}>{t('I Understand')}</button>
      </div>
    </div>
  );
};

export default DisclaimerPopup;