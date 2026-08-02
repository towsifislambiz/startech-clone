import { useEffect } from 'react';
import { SITE_NAME } from '../constants';

export const useDocumentTitle = (title, override = false) => {
  useEffect(() => {
    const defaultTitle = `${SITE_NAME} - Leading Computer, Laptop & Component Shop in Bangladesh`;
    document.title = override ? title : title ? `${title} | ${SITE_NAME}` : defaultTitle;
  }, [title, override]);
};

export default useDocumentTitle;
