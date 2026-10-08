import useCart from '../../hooks/useCart'
import { isProblemUser } from '../../utils/qa'
import ConfirmDialog from '../ui/ConfirmDialog'

const ModalDeleteProduct = ({ product, onClose }) => {
  const { dispatch, cart } = useCart()

  const handleDelete = () => {
    // problem_user: always removes the first product of the cart
    const productId = isProblemUser() ? cart[0].id : product.id
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
    onClose()
  }

  return (
    <ConfirmDialog
      title='Remove product'
      message={`Are you sure you want to remove "${product.title}" from the cart?`}
      confirmLabel='Yes, remove'
      onConfirm={handleDelete}
      onClose={onClose}
      testIds={{ dialog: 'delete-modal', cancel: 'cancel-delete', confirm: 'confirm-delete' }}
    />
  )
}

export default ModalDeleteProduct
