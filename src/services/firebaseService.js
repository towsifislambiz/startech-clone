/**
 * Firebase / Firestore Placeholder Architecture
 * Ready for initialization in future phases
 */
export const firebaseService = {
  isConfigured: () => {
    return !!process.env.REACT_APP_FIREBASE_API_KEY;
  },

  logEvent: (eventName, params = {}) => {
    // Analytics logging placeholder
  },
};

export default firebaseService;
