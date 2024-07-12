import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSelector from '../components/LanguageSelector';
import Disclaimer from '../components/Disclaimer';
import Calculator from '../components/Calculator';
import LanguagePopup from '../components/LanguagePopup';
import DisclaimerPopup from '../components/DisclaimerPopup';

export default function Home() {
  const { t } = useTranslation();
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showDisclaimerPopup, setShowDisclaimerPopup] = useState(false);

  useEffect(() => {
    const languageSet = localStorage.getItem('language');
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');

    if (!languageSet) {
      setShowLanguagePopup(true);
    } else if (!disclaimerAccepted) {
      setShowDisclaimerPopup(true);
    }
  }, []);

  const handleLanguagePopupClose = () => {
    setShowLanguagePopup(false);
    if (!localStorage.getItem('disclaimerAccepted')) {
      setShowDisclaimerPopup(true);
    }
  };

  const handleDisclaimerPopupClose = () => {
    setShowDisclaimerPopup(false);
    localStorage.setItem('disclaimerAccepted', 'true');
  };

  return (
    <>
      <Head>
        <title>{t('The Dose Buddy - Insulin Dosage Calculator')}</title>
        <meta name="description" content={t('An insulin dosage calculator')} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Dose Buddy" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <LanguageSelector />
      
      <main>
        <Disclaimer />
        <Calculator />
        <div className="signature">Fonz, MS/MPH</div>
      </main>

      {showLanguagePopup && <LanguagePopup onClose={handleLanguagePopupClose} />}
      {showDisclaimerPopup && <DisclaimerPopup onClose={handleDisclaimerPopupClose} />}
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}