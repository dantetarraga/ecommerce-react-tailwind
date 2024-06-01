import cartStore from '../store/cartStore'

const useCart = () => {
  const { cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice } = cartStore()
  const totalItems = getTotalItems()

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    getTotalPrice
  }
}

export default useCart
