/**
 * User Data Model Factory
 */
export const createUserModel = (data = {}) => ({
  id: data.id || null,
  firstName: data.firstName || data.first_name || '',
  lastName: data.lastName || data.last_name || '',
  email: data.email || '',
  phone: data.phone || '',
  role: data.role || 'user', // user | seller | admin
  avatar: data.avatar || '',
  addresses: data.addresses || [],
  createdAt: data.createdAt || new Date().toISOString(),
});

export default createUserModel;
