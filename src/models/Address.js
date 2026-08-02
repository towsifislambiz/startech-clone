/**
 * Shipping Address Model Factory
 */
export const createAddressModel = (data = {}) => ({
  id: data.id || null,
  fullName: data.fullName || '',
  phone: data.phone || '',
  streetAddress: data.streetAddress || data.address || '',
  city: data.city || '',
  district: data.district || '',
  postalCode: data.postalCode || '',
  isDefault: data.isDefault || false,
});

export default createAddressModel;
