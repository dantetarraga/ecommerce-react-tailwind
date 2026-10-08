import { useState } from 'react'
import { toast } from 'sonner'
import { createProduct, updateProduct } from '../../services/products'
import productStore from '../../store/productStore'
import { validateProduct } from '../../utils/validators'
import ErrorBanner from '../form/ErrorBanner'
import FormInput from '../form/FormInput'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

const toFormValues = (product) => ({
  title: product?.title ?? '',
  price: product ? String(product.price) : '',
  category: product?.category ?? '',
  stock: product ? String(product.stock) : '',
  description: product?.description ?? '',
  image: product?.image ?? ''
})

const ProductFormModal = ({ product, categories, onClose }) => {
  const isEditing = !!product
  const addProduct = productStore((state) => state.addProduct)
  const editProduct = productStore((state) => state.updateProduct)
  const [values, setValues] = useState(toFormValues(product))
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateProduct(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const data = {
      title: values.title.trim(),
      price: Number(values.price),
      category: values.category,
      stock: Number(values.stock),
      description: values.description.trim(),
      image: values.image.trim()
    }

    setIsSaving(true)
    setFormError('')
    try {
      if (isEditing) {
        await updateProduct(product.id, data)
        editProduct(product.id, data)
        toast.success('Product updated successfully')
      } else {
        await createProduct(data)
        // The API always answers with the same id, so a unique one is generated locally
        addProduct({ ...data, id: Date.now(), rating: { rate: 0, count: 0 } })
        toast.success('Product created successfully')
      }
      onClose()
    } catch {
      setFormError('The product could not be saved. Please try again.')
      setIsSaving(false)
    }
  }

  return (
    <Modal title={isEditing ? 'Edit product' : 'New product'} onClose={onClose}>
      <form noValidate data-testid='product-form' onSubmit={handleSubmit} className='flex flex-col gap-5 p-6'>
        <ErrorBanner message={formError} testId='product-form-error' />

        <FormInput id='title' label='Title' value={values.title} onChange={handleChange} error={errors.title} />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          <FormInput id='price' label='Price ($)' inputMode='decimal' value={values.price} onChange={handleChange} error={errors.price} />
          <FormInput id='stock' label='Stock' inputMode='numeric' value={values.stock} onChange={handleChange} error={errors.stock} />
          <FormInput as='select' id='category' label='Category' value={values.category} onChange={handleChange} error={errors.category} className='capitalize'>
            <option value=''>Select...</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </FormInput>
        </div>
        <FormInput id='image' label='Image URL' value={values.image} onChange={handleChange} error={errors.image} />
        <FormInput as='textarea' id='description' label='Description' rows={4} value={values.description} onChange={handleChange} error={errors.description} />

        <div className='flex flex-col-reverse sm:flex-row sm:justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>Cancel</Button>
          <Button type='submit' data-testid='save-product' disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save product'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductFormModal
