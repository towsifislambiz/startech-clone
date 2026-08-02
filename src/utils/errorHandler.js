import { createErrorResponse } from './response';

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status code
    const message = error.response.data?.message || error.response.data?.error || 'Server error';
    return createErrorResponse(message, error.response.status);
  } else if (error.request) {
    // Network error / no response
    return createErrorResponse('Network error. Please check your connection.', 503);
  } else {
    return createErrorResponse(error.message || 'Unknown application error', 500);
  }
};

export default handleApiError;
