import { useState, useEffect } from 'react';
import productService from '../services/productService';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    productService
      .getProducts(initialParams)
      .then((res) => {
        if (isMounted) {
          if (res.success && Array.isArray(res.data)) {
            setProducts(res.data);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;
