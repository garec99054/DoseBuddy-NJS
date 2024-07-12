import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { createConfetti } from '../utils/confetti';

const Calculator = () => {
  const { t } = useTranslation('common');
  const [inputs, setInputs] = useState({
    carbsEaten: '',
    insulinCarbRatio: '',
    currentBloodSugar: '',
    targetBloodSugar: '',
    correctionFactor: ''
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    Object.keys(inputs).forEach(key => {
      const savedValue = localStorage.getItem(key);
      if (savedValue) {
        setInputs(prev => ({ ...prev, [key]: savedValue }));
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    localStorage.setItem(name, value);
    e.target.classList.add('input-animation');
    setTimeout(() => e.target.classList.remove('input-animation'), 300);
  };

  const calculateDose = (e) => {
    e.preventDefault();
    
    const values = Object.keys(inputs).reduce((acc, key) => {
      acc[key] = parseFloat(inputs[key]) || 0;
      return acc;
    }, {});

    const insulinForCarbs = values.carbsEaten / values.insulinCarbRatio;
    const correctionDose = Math.max(0, (values.currentBloodSugar - values.targetBloodSugar) / values.correctionFactor);

    const totalInsulin = insulinForCarbs + correctionDose;
    const roundedInsulin = Math.round(totalInsulin * 10) / 10;

    setResult({
      recommended: roundedInsulin,
      actual: totalInsulin,
      carbDose: insulinForCarbs,
      correctionDose: correctionDose
    });

    createConfetti();
  };

  return (
    <div className="container">
      <h1>{t('The Dose Buddy 💉 v2')}</h1>
      <h2>{t('An insulin dosage calculator')}</h2>
      <form onSubmit={calculateDose}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="carbsEaten">{t('Carbs eaten (g)')}</label>
            <input
              type="number"
              id="carbsEaten"
              name="carbsEaten"
              value={inputs.carbsEaten}
              onChange={handleInputChange}
              placeholder={t('Enter grams')}
              min="0"
              step="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="insulinCarbRatio">{t('Insulin to carb ratio')}</label>
            <input
              type="number"
              id="insulinCarbRatio"
              name="insulinCarbRatio"
              value={inputs.insulinCarbRatio}
              onChange={handleInputChange}
              placeholder={t('1 unit : __ g')}
              min="1"
              step="1"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="currentBloodSugar">{t('Current BG (mg/dL)')}</label>
            <input
              type="number"
              id="currentBloodSugar"
              name="currentBloodSugar"
              value={inputs.currentBloodSugar}
              onChange={handleInputChange}
              placeholder={t('Enter mg/dL')}
              min="0"
              step="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="targetBloodSugar">{t('Target BG (mg/dL)')}</label>
            <input
              type="number"
              id="targetBloodSugar"
              name="targetBloodSugar"
              value={inputs.targetBloodSugar}
              onChange={handleInputChange}
              placeholder={t('Enter mg/dL')}
              min="0"
              step="1"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="correctionFactor">{t('Correction factor')}</label>
            <input
              type="number"
              id="correctionFactor"
              name="correctionFactor"
              value={inputs.correctionFactor}
              onChange={handleInputChange}
              placeholder={t('1 unit : __ mg/dL')}
              min="1"
              step="1"
            />
          </div>
        </div>
        <button type="submit">{t('Calculate Dose')}</button>
      </form>
      {result && (
        <div id="result" className="show">
          <p>{t('Recommended insulin dose:')}</p>
          <span className="highlight glitter" style={{ color: result.recommended <= 5 ? 'green' : result.recommended <= 10 ? 'orange' : 'red' }}>
            {result.recommended} {t('units')}
          </span>
          <p className="actual-value">{t('Actual calculated value:')} {result.actual.toFixed(2)} {t('units')}</p>
          <p>{t('Carb dose:')} {result.carbDose.toFixed(2)} {t('units')}</p>
          <p>{t('Correction dose:')} {result.correctionDose.toFixed(2)} {t('units')}</p>
        </div>
      )}
    </div>
  );
};

export default Calculator;