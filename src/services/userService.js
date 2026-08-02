import { db, doc, updateDoc, collection, addDoc, serverTimestamp } from '../firebase/config';

const getStoredAddresses = () => {
  try {
    const saved = localStorage.getItem('startech-user-addresses');
    return saved ? JSON.parse(saved) : [
      {
        id: 'addr_default_1',
        title: 'Home (Default)',
        address: 'House 45, Road 11, Block D, Mirpur 10',
        city: 'Dhaka',
        division: 'Dhaka',
        postalCode: '1216',
        phone: '01712345678',
        isDefault: true
      }
    ];
  } catch (e) {
    return [];
  }
};

const saveAddressesToLocal = (addresses) => {
  try {
    localStorage.setItem('startech-user-addresses', JSON.stringify(addresses));
  } catch (e) {}
};

const getStoredReviews = () => {
  try {
    const saved = localStorage.getItem('startech-user-reviews');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveReviewsToLocal = (reviews) => {
  try {
    localStorage.setItem('startech-user-reviews', JSON.stringify(reviews));
  } catch (e) {}
};

export const userService = {
  /**
   * Update user profile information
   */
  async updateProfile(uid, profileData) {
    const existingUser = JSON.parse(localStorage.getItem('startech-user') || '{}');
    const updatedUser = { ...existingUser, ...profileData };
    localStorage.setItem('startech-user', JSON.stringify(updatedUser));

    if (uid) {
      try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, profileData);
      } catch (err) {
        console.warn('Firestore profile update notice (offline fallback mode):', err);
      }
    }

    return updatedUser;
  },

  // ============= ADDRESS BOOK MANAGEMENT =============
  getAddresses() {
    return getStoredAddresses();
  },

  saveAddress(addressData) {
    const addresses = getStoredAddresses();
    let updated;

    if (addressData.id) {
      updated = addresses.map((a) => (a.id === addressData.id ? { ...a, ...addressData } : a));
    } else {
      const newAddress = {
        id: `addr_${Date.now()}`,
        isDefault: addresses.length === 0,
        ...addressData
      };
      updated = [newAddress, ...addresses];
    }

    saveAddressesToLocal(updated);
    return updated;
  },

  deleteAddress(addressId) {
    const addresses = getStoredAddresses();
    const updated = addresses.filter((a) => a.id !== addressId);
    saveAddressesToLocal(updated);
    return updated;
  },

  setDefaultAddress(addressId) {
    const addresses = getStoredAddresses();
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === addressId
    }));
    saveAddressesToLocal(updated);
    return updated;
  },

  // ============= REVIEW MANAGEMENT =============
  getReviews() {
    return getStoredReviews();
  },

  async submitReview(reviewData) {
    const reviews = getStoredReviews();
    const newReview = {
      id: `rev_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Published',
      ...reviewData
    };

    const updated = [newReview, ...reviews];
    saveReviewsToLocal(updated);

    try {
      await addDoc(collection(db, 'reviews'), {
        ...newReview,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore review submission notice (offline fallback mode):', err);
    }

    return newReview;
  }
};

export default userService;
