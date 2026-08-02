import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist, removeFromWishlist, clearWishlist } from '../store/wishlistSlice';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const isWishlisted = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (product) => {
    const exists = isWishlisted(product.id);
    dispatch(toggleWishlist(product));
    if (exists) {
      showNotification(`Removed "${product.name}" from Wishlist`, 'info');
    } else {
      showNotification(`Added "${product.name}" to Wishlist!`, 'success');
    }
  };

  const moveToCart = (product) => {
    addToCart(product, 1);
    dispatch(removeFromWishlist(product.id));
    showNotification(`Moved "${product.name}" to Cart!`, 'success');
  };

  return {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isWishlisted,
    toggleWishlist: handleToggleWishlist,
    removeFromWishlist: (id) => dispatch(removeFromWishlist(id)),
    clearWishlist: () => dispatch(clearWishlist()),
    moveToCart
  };
};

export default useWishlist;
