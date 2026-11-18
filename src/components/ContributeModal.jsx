import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/initialProverbs';
import { X, PlusCircle, CheckCircle, AlertCircle } from 'lucide-react';

export const ContributeModal = ({ isOpen, onClose, onProverbAdded }) => {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    kannada: '',
    transliteration: '',
    english_meaning: '',
    kannada_meaning: '',
    category: 'education',
    situation: '',
    tags: '',
    contributor: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validCategories = CATEGORIES.filter(c => c.id !== 'all');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.kannada.trim()) {
      setError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಕನ್ನಡ ಗಾದೆಯನ್ನು ನಮೂದಿಸಿ' : 'Please enter the proverb in Kannada.');
      return;
    }
    if (!formData.english_meaning.trim() && !formData.kannada_meaning.trim()) {
      setError(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಗಾದೆಯ ಅರ್ಥವನ್ನು ನಮೂದಿಸಿ' : 'Please provide either the English or Kannada meaning.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const selectedCatObj = validCategories.find(c => c.id === formData.category);
      const proverbPayload = {
        kannada: formData.kannada.trim(),
        transliteration: formData.transliteration.trim(),
        english_meaning: formData.english_meaning.trim() || formData.kannada_meaning.trim(),
        kannada_meaning: formData.kannada_meaning.trim() || formData.english_meaning.trim(),
        category: formData.category,
        category_kn: selectedCatObj ? selectedCatObj.label_kn : 'ಸಾಮಾನ್ಯ',
        situation: formData.situation.trim(),
        situation_kn: formData.situation.trim(),
        tags: formData.tags
          ? formData.tags.split(',').map(tag => tag.trim().toLowerCase()).filter(Boolean)
          : [formData.category],
        contributor: formData.contributor.trim() || (lang === 'kn' ? 'ಸಮುದಾಯ ಕೊಡುಗೆದಾರ' : 'Community Member')
      };

      await onProverbAdded(proverbPayload);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset form
        setFormData({
          kannada: '',
          transliteration: '',
          english_meaning: '',
          kannada_meaning: '',
          category: 'education',
          situation: '',
          tags: '',
          contributor: ''
        });
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(lang === 'kn' ? 'ಗಾದೆ ದಾಖಲಿಸುವಾಗ ದೋಷ ಉಂಟಾಗಿದೆ.' : 'Failed to save proverb. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-cream-50 rounded-2xl shadow-2xl border border-cream-300 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-cream-200 bg-cream-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-kred-700 flex items-center justify-center text-cream-50">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brown-950 font-serif">
                {t.contributeModalTitle}
              </h3>
              <p className="text-xs text-brown-600">
                {t.contributeModalDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brown-500 hover:text-brown-900 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-kred-50 text-kred-800 text-xs border border-kred-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-kred-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 font-semibold">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{t.successMsg}</span>
            </div>
          )}

          {/* Kannada Proverb Input */}
          <div>
            <label className="block text-xs font-bold text-brown-900 mb-1">
              {t.formKannada} <span className="text-kred-600">*</span>
            </label>
            <input
              type="text"
              name="kannada"
              required
              value={formData.kannada}
              onChange={handleChange}
              placeholder="ಉದಾ: ಹಾಸಿಗೆ ಇದ್ದಷ್ಟು ಕಾಲು ಚಾಚು"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white font-kannada text-sm text-brown-900 focus:border-kred-600 focus:ring-2 focus:ring-kred-100 outline-none"
            />
          </div>

          {/* Transliteration */}
          <div>
            <label className="block text-xs font-bold text-brown-900 mb-1">
              {t.formTransliteration}
            </label>
            <input
              type="text"
              name="transliteration"
              value={formData.transliteration}
              onChange={handleChange}
              placeholder="e.g. Haasige iddashtu kaalu chaachu"
              className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white text-xs text-brown-900 focus:border-kred-600 outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-brown-900 mb-1">
              {t.formCategory} <span className="text-kred-600">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-white text-xs font-medium text-brown-900 focus:border-kred-600 outline-none"
            >
              {validCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {lang === 'kn' ? cat.label_kn : cat.label_en} ({cat.label_en})
                </option>
              ))}
            </select>
          </div>

          {/* English Meaning */}
          <div>
            <label className="block text-xs font-bold text-brown-900 mb-1">
              {t.formEnglishMeaning} <span className="text-kred-600">*</span>
            </label>
            <textarea
              name="english_meaning"
              rows="2"
              value={formData.english_meaning}
              onChange={handleChange}
              placeholder="e.g. Live strictly within your financial means..."
              className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white text-xs text-brown-900 focus:border-kred-600 outline-none resize-none"
            />
          </div>

          {/* Kannada Meaning */}
          <div>
            <label className="block text-xs font-bold text-brown-900 mb-1">
              {t.formKannadaMeaning}
            </label>
            <textarea
              name="kannada_meaning"
              rows="2"
              value={formData.kannada_meaning}
              onChange={handleChange}
              placeholder="ಉದಾ: ತನ್ನ ಆದಾಯಕ್ಕೆ ತಕ್ಕಂತೆ ಮಾತ್ರ ವೆಚ್ಚ ಮಾಡಬೇಕು..."
              className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white font-kannada text-xs text-brown-900 focus:border-kred-600 outline-none resize-none"
            />
          </div>

          {/* Situation Context */}
          <div>
            <label className="block text-xs font-bold text-brown-900 mb-1">
              {t.formSituation}
            </label>
            <input
              type="text"
              name="situation"
              value={formData.situation}
              onChange={handleChange}
              placeholder="e.g. When someone overspends or lives on debt"
              className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white text-xs text-brown-900 focus:border-kred-600 outline-none"
            />
          </div>

          {/* Tags & Contributor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-brown-900 mb-1">
                {t.formTags}
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="budget, money, saving"
                className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white text-xs text-brown-900 focus:border-kred-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brown-900 mb-1">
                {t.formContributor}
              </label>
              <input
                type="text"
                name="contributor"
                value={formData.contributor}
                onChange={handleChange}
                placeholder="e.g. Ramesh K."
                className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white text-xs text-brown-900 focus:border-kred-600 outline-none"
              />
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-cream-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-brown-700 hover:bg-cream-100 transition-colors"
            >
              {t.cancelButton}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-kred-700 hover:bg-kred-800 disabled:opacity-50 text-cream-50 text-xs font-bold shadow-md transition-all active:scale-95"
            >
              {isSubmitting ? t.submitting : t.submitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
