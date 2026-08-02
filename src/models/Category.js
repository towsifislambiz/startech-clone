/**
 * Category Data Model Factory
 */
export const createCategoryModel = (data = {}) => ({
  id: data.id || null,
  name: data.name || '',
  slug: data.slug || '',
  parentId: data.parentId || null,
  icon: data.icon || null,
  image: data.image || '',
  description: data.description || '',
});

export default createCategoryModel;
