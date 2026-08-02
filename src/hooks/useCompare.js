import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleCompare, removeFromCompare, clearCompare } from '../store/compareSlice';
import { useNotification } from '../context/NotificationContext';

export const useCompare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compareItems = useSelector((state) => state.compare.items);
  const maxLimit = useSelector((state) => state.compare.maxLimit);
  const { showNotification } = useNotification();

  const isCompared = (productId) => {
    return compareItems.some((item) => item.id === productId);
  };

  const handleToggleCompare = (product) => {
    const exists = isCompared(product.id);
    if (!exists && compareItems.length >= maxLimit) {
      showNotification(`Compare limit reached (Max 4 products). Replacing oldest product.`, 'warning');
    }
    dispatch(toggleCompare(product));
    if (exists) {
      showNotification(`Removed "${product.name}" from Compare`, 'info');
    } else {
      showNotification(`Added "${product.name}" to Compare!`, 'success');
    }
  };

  const goToComparison = () => {
    navigate('/comparison');
  };

  return {
    compareItems,
    compareCount: compareItems.length,
    maxLimit,
    isCompared,
    toggleCompare: handleToggleCompare,
    removeFromCompare: (id) => dispatch(removeFromCompare(id)),
    clearCompare: () => dispatch(clearCompare()),
    goToComparison
  };
};

export default useCompare;
