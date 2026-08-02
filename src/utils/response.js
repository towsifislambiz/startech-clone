/**
 * Create standardized success response wrapper
 */
export const createSuccessResponse = (data = null, message = 'Success') => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
});

/**
 * Create standardized error response wrapper
 */
export const createErrorResponse = (error = 'An error occurred', code = 400) => ({
  success: false,
  error: typeof error === 'string' ? error : error?.message || 'Server error',
  code,
  timestamp: new Date().toISOString(),
});

export default { createSuccessResponse, createErrorResponse };
