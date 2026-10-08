import cartStore from '../store/cartStore'

const useCart = () => {
  const { cart, coupon, dispatch, getTotalItems, getTotalPrice } = cartStore()
  const totalItems = getTotalItems()

  const isProductInCart = (product) => (cart.some((item) => item.id === product.id))

  return {
    cart,
    coupon,
    dispatch,
    totalItems,
    getTotalPrice,
    isProductInCart
  }
}

export default useCart
