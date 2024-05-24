import { useEffect, useState } from 'react'

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalItems = data.length

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    if (data.length < itemsPerPage) setCurrentPage(1)
  }, [currentPage])

  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages))

  const goToPrevPage = () => setCurrentPage((page) => Math.max(page - 1, 1))

  const goToPage = (page) => setCurrentPage(page)

  return {
    currentItems,
    currentPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
    goToPage,
    indexOfFirstItem,
    indexOfLastItem
  }
}

export default usePagination
