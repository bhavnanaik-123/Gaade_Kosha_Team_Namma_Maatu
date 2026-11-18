/**
 * Audio Player Utility for Gaadhe Kosha
 * 
 * Supports:
 * 1. Stored authentic audio playback via HTML5 Audio (when audio_url exists).
 * 2. Browser Speech Synthesis for Kannada text (when no stored audio exists).
 * 3. Accurate detection of Kannada voices (kn-IN, kn, Microsoft Madhur/Swara, Google).
 * 4. Transparent error handling with bilingual messages when audio/voices are unavailable.
 * 5. Prevents Chromium utterance garbage collection and handles pause/resume states.
 */

// Module-level reference to prevent garbage collection of SpeechSynthesisUtterance in Chromium
let activeUtterance = null;
let activeAudioElement = null;

let cachedVoices = [];
let voicesLoaded = false;

function loadVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
    voicesLoaded = true;
  }
  return cachedVoices;
}

// Pre-load voices on browser start
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }
}

/**
 * Find the best matching Kannada voice available in the browser.
 */
export function findKannadaVoice() {
  const voices = loadVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Exact kn-IN match (e.g., Microsoft Madhur, Microsoft Swara, Google ಕನ್ನಡ)
  const exact = voices.find(v => 
    v.lang === 'kn-IN' || 
    v.lang === 'kn_IN' ||
    v.lang.toLowerCase() === 'kn'
  );
  if (exact) return exact;

  // 2. Name contains Kannada
  const byName = voices.find(v => 
    v.name.toLowerCase().includes('kannada') || 
    v.name.includes('ಕನ್ನಡ')
  );
  if (byName) return byName;

  // 3. Fallback: check lang prefix
  const byPrefix = voices.find(v => v.lang.toLowerCase().startsWith('kn'));
  if (byPrefix) return byPrefix;

  return null;
}

/**
 * Check if audio playback is supported and what type.
 * Returns: { hasStoredAudio: boolean, hasKannadaVoice: boolean, hasSpeechSynthesis: boolean }
 */
export function checkAudioCapabilities(audioUrl) {
  const hasStoredAudio = Boolean(audioUrl && audioUrl.trim().length > 0);
  const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const kannadaVoice = findKannadaVoice();

  return {
    hasStoredAudio,
    hasSpeechSynthesis,
    hasKannadaVoice: Boolean(kannadaVoice),
    kannadaVoiceName: kannadaVoice?.name || null
  };
}

/**
 * Stop any currently playing audio (HTML5 or SpeechSynthesis)
 */
export function stopAllAudio() {
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch (e) {
      // ignore
    }
    activeAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
    activeUtterance = null;
  }
}

/**
 * Play audio for a proverb or explanation.
 * 
 * @param {Object} options
 * @param {string} options.text - Kannada text to speak (proverb or explanation)
 * @param {string} [options.audioUrl] - URL of authentic stored recording if available
 * @param {number} [options.rate=0.85] - Speech rate
 * @param {Function} [options.onStart] - Callback when playback starts: ({ source: 'stored' | 'synthesis' })
 * @param {Function} [options.onEnd] - Callback when playback finishes cleanly
 * @param {Function} [options.onError] - Callback with bilingual error message if playback fails
 */
export function playKannadaAudio({ text, audioUrl, rate = 0.85, onStart, onEnd, onError }) {
  stopAllAudio();

  // Mode 1: Authentic Stored Audio Recording
  if (audioUrl && audioUrl.trim().length > 0) {
    try {
      const audio = new Audio(audioUrl);
      activeAudioElement = audio;

      audio.onplay = () => {
        if (onStart) onStart({ source: 'stored', voice: null });
      };

      audio.onended = () => {
        activeAudioElement = null;
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        activeAudioElement = null;
        console.warn('Stored audio failed to load, falling back to speech synthesis:', e);
        // Fall back to speech synthesis if stored audio fails
        speakText(text, rate, onStart, onEnd, onError, true);
      };

      audio.play().catch((err) => {
        activeAudioElement = null;
        console.warn('Audio play() rejected, falling back to speech synthesis:', err);
        speakText(text, rate, onStart, onEnd, onError, true);
      });

      return;
    } catch (e) {
      console.warn('Could not initialize HTML5 audio:', e);
    }
  }

  // Mode 2: Browser Speech Synthesis
  speakText(text, rate, onStart, onEnd, onError, false);
}

function speakText(text, rate, onStart, onEnd, onError, hadStoredFallback = false) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) {
      onError({
        code: 'NOT_SUPPORTED',
        message_en: 'Speech audio is not supported in this browser. Please use Chrome, Edge, or a modern browser.',
        message_kn: 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸೌಲಭ್ಯ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು Chrome ಅಥವಾ Edge ಬ್ರೌಸರ್ ಬಳಸಿ.'
      });
    }
    return;
  }

  if (!text || !text.trim()) {
    if (onError) {
      onError({
        code: 'NO_TEXT',
        message_en: 'No text available to play.',
        message_kn: 'ಪ್ಲೇ ಮಾಡಲು ಯಾವುದೇ ಪಠ್ಯ ಲಭ್ಯವಿಲ್ಲ.'
      });
    }
    return;
  }

  const cleanText = text.trim();
  const kannadaVoice = findKannadaVoice();

  // If no Kannada voice exists on this device/browser
  if (!kannadaVoice) {
    // Check if system voices are still loading
    const voices = loadVoices();
    if (voices.length === 0) {
      // Try again once after a tiny delay in case voices are initializing
      setTimeout(() => {
        const retryVoice = findKannadaVoice();
        if (retryVoice) {
          executeUtterance(cleanText, retryVoice, rate, onStart, onEnd, onError);
        } else {
          notifyVoiceUnavailable(onError);
        }
      }, 250);
      return;
    }

    notifyVoiceUnavailable(onError);
    return;
  }

  executeUtterance(cleanText, kannadaVoice, rate, onStart, onEnd, onError);
}

function notifyVoiceUnavailable(onError) {
  if (onError) {
    onError({
      code: 'VOICE_UNAVAILABLE',
      message_en: 'Kannada speech voice is not installed on this system/browser. (To enable on Windows: Settings > Time & Language > Speech > Add Kannada; on Mobile: Chrome supports Kannada natively).',
      message_kn: 'ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್ ಅಥವಾ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿ ಪ್ಯಾಕ್ (Kannada Voice) ಲಭ್ಯವಿಲ್ಲ. ವಿಂಡೋಸ್ ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿಯನ್ನು ಸೇರಿಸಿ ಅಥವಾ ಮೊಬೈಲ್ Chrome ನಲ್ಲಿ ಪ್ರಯತ್ನಿಸಿ.'
    });
  }
}

function executeUtterance(text, voice, rate, onStart, onEnd, onError) {
  try {
    window.speechSynthesis.cancel();
    // Resume in case Chrome paused synthesis
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance; // Prevent garbage collection

    utterance.lang = voice ? voice.lang : 'kn-IN';
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;

    utterance.onstart = () => {
      if (onStart) {
        onStart({ 
          source: 'synthesis', 
          voice: voice ? voice.name : 'System Default (kn-IN)' 
        });
      }
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      activeUtterance = null;
      console.warn('Speech synthesis error event:', event);
      if (onError) {
        if (event.error === 'canceled' || event.error === 'interrupted') {
          // User stopped it, do not show error banner
          if (onEnd) onEnd();
          return;
        }

        onError({
          code: event.error || 'SPEECH_ERROR',
          message_en: `Audio playback encountered an issue (${event.error || 'unknown'}). A native Kannada voice pack may be required.`,
          message_kn: `ಧ್ವನಿ ಪ್ಲೇಬ್ಯಾಕ್‌ನಲ್ಲಿ ದೋಷ ಕಂಡುಬಂದಿದೆ (${event.error || 'ದೋಷ'}). ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿ ಪರಿಶೀಲಿಸಿ.`
        });
      }
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    activeUtterance = null;
    console.error('SpeechSynthesis.speak exception:', err);
    if (onError) {
      onError({
        code: 'EXCEPTION',
        message_en: 'Unable to start speech audio playback in this browser.',
        message_kn: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಆರಂಭಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.'
      });
    }
  }
}
