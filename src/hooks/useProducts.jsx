import { useEffect, useMemo, useState } from 'react'
import { getAllProducts } from '../services/products'
import productStore from '../store/productStore'
import { mergeProducts } from '../utils/products'

export const useMergedProducts = (apiProducts) => {
  const created = productStore((state) => state.created)
  const updated = productStore((state) => state.updated)
  const deleted = productStore((state) => state.deleted)

  return useMemo(
    () => mergeProducts(apiProducts, { created, updated, deleted }),
    [apiProducts, created, updated, deleted]
  )
}

const useProducts = () => {
  const [apiProducts, setApiProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const products = useMergedProducts(apiProducts)

  useEffect(() => {
    getAllProducts()
      .then(setApiProducts)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [])

  return { products, isLoading, error }
}

export default useProducts
