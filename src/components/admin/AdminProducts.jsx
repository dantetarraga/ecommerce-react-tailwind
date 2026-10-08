import { useMemo, useState } from 'react'
import { HiMagnifyingGlass, HiOutlineArrowPath, HiOutlinePencilSquare, HiOutlineTrash, HiPlus } from 'react-icons/hi2'
import { toast } from 'sonner'
import { deleteProduct } from '../../services/products'
import productStore from '../../store/productStore'
import { formatPrice } from '../../utils/products'
import ConfirmDialog from '../ui/ConfirmDialog'
import Button from '../ui/Button'
import ProductFormModal from './ProductFormModal'

const DeleteProductDialog = ({ product, onClose }) => {
  const removeProduct = productStore((state) => state.deleteProduct)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteProduct(product.id)
      removeProduct(product.id)
      toast.success('Product deleted successfully')
      onClose()
    } catch {
      toast.error('The product could not be deleted')
      setIsDeleting(false)
    }
  }

  return (
    <ConfirmDialog
      title='Delete product'
      message={`Are you sure you want to delete "${product.title}"? This action cannot be undone.`}
      confirmLabel='Yes, delete'
      onConfirm={handleDelete}
      onClose={onClose}
      isLoading={isDeleting}
      testIds={{ dialog: 'delete-product-modal', confirm: 'confirm-delete-product' }}
    />
  )
}

const AdminProducts = ({ products }) => {
  const resetCatalog = productStore((state) => state.resetCatalog)
  const [search, setSearch] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState(null)

  const categories = useMemo(() => [...new Set(products.map(({ category }) => category))], [products])
  const filteredProducts = products.filter(({ title }) => title.toLowerCase().includes(search.trim().toLowerCase()))

  const handleReset = () => {
    resetCatalog()
    toast.success('Catalog restored to the Fake Store API data')
  }

  const closeForm = () => {
    setIsCreating(false)
    setEditingProduct(null)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col md:flex-row gap-3 md:items-center'>
        <div className='relative flex-1'>
          <HiMagnifyingGlass className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' aria-hidden='true' />
          <input
            type='search'
            aria-label='Search products'
            data-testid='admin-product-search'
            placeholder='Search by title...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='input h-11 rounded-full pl-11'
          />
        </div>
        <div className='flex gap-3'>
          <Button variant='outline' data-testid='reset-catalog' onClick={handleReset} className='flex-1'>
            <HiOutlineArrowPath /> Reset catalog
          </Button>
          <Button data-testid='new-product' onClick={() => setIsCreating(true)} className='flex-1'>
            <HiPlus /> New product
          </Button>
        </div>
      </div>

      <div className='table-wrapper'>
        <table className='data-table' data-testid='admin-products-table'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Product</th>
              <th scope='col'>Category</th>
              <th scope='col'>Price</th>
              <th scope='col'>Stock</th>
              <th scope='col'><span className='sr-only'>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} data-testid={`admin-product-${product.id}`}>
                <td className='text-gray-500'>{product.id}</td>
                <td>
                  <div className='flex items-center gap-3'>
                    <img src={product.image} alt='' className='h-10 w-10 object-contain' />
                    <p className='w-[260px] truncate font-medium'>{product.title}</p>
                  </div>
                </td>
                <td className='capitalize'>{product.category}</td>
                <td className='font-semibold'>{formatPrice(product.price)}</td>
                <td>
                  <span className={product.stock === 0 ? 'font-semibold text-red-600' : ''}>{product.stock}</span>
                </td>
                <td>
                  <div className='flex justify-end gap-1'>
                    <Button variant='ghost' size='icon' aria-label={`Edit ${product.title}`} data-testid='edit-product' onClick={() => setEditingProduct(product)}>
                      <HiOutlinePencilSquare className='text-lg' />
                    </Button>
                    <Button variant='ghost' size='icon' aria-label={`Delete ${product.title}`} data-testid='delete-product' onClick={() => setDeletingProduct(product)} className='text-red-600 hover:bg-red-50'>
                      <HiOutlineTrash className='text-lg' />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isCreating || editingProduct) && <ProductFormModal product={editingProduct} categories={categories} onClose={closeForm} />}
      {deletingProduct && <DeleteProductDialog product={deletingProduct} onClose={() => setDeletingProduct(null)} />}
    </div>
  )
}

export default AdminProducts
