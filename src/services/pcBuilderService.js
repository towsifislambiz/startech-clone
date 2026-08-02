import { db, collection, addDoc, getDocs, query, where, serverTimestamp } from '../firebase/config';

const getSavedLocalBuilds = () => {
  try {
    const saved = localStorage.getItem('startech-pc-builds');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalBuilds = (builds) => {
  try {
    localStorage.setItem('startech-pc-builds', JSON.stringify(builds));
  } catch (e) {}
};

export const pcBuilderService = {
  /**
   * Save a custom PC Build configuration
   */
  async saveBuild(buildData) {
    const buildId = `build_${Date.now()}`;
    const createdAt = new Date().toISOString();

    const payload = {
      buildId,
      userId: buildData.userId || 'guest_user',
      buildName: buildData.buildName || 'Custom Gaming Rig',
      components: buildData.components || {},
      totalPrice: buildData.totalPrice || 0,
      createdAt
    };

    const local = getSavedLocalBuilds();
    const updated = [payload, ...local];
    saveLocalBuilds(updated);

    try {
      await addDoc(collection(db, 'pcBuilds'), {
        ...payload,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore PC build save notice (offline fallback):', err);
    }

    return payload;
  },

  /**
   * Fetch saved PC builds
   */
  async getUserBuilds(userId) {
    let local = getSavedLocalBuilds();
    try {
      if (userId) {
        const q = query(collection(db, 'pcBuilds'), where('userId', '==', userId));
        const snapshot = await getDocs(q);
        const remote = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

        if (remote.length > 0) {
          const map = new Map();
          [...remote, ...local].forEach((item) => map.set(item.buildId, item));
          local = Array.from(map.values());
          saveLocalBuilds(local);
        }
      }
    } catch (e) {}

    return local;
  },

  /**
   * Delete a saved build
   */
  async deleteBuild(buildId) {
    const local = getSavedLocalBuilds();
    const updated = local.filter((b) => b.buildId !== buildId);
    saveLocalBuilds(updated);
    return updated;
  }
};

export default pcBuilderService;
