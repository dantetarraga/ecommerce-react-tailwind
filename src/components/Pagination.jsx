import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

const pageButtonClass = 'flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40'

const Pagination = ({ currentPage, totalPages, goToNextPage, goToPrevPage, goToPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handlePageChange = (action) => {
    action()
    document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav aria-label='Pagination' className='mt-12 flex justify-center' data-testid='pagination'>
      <ul className='flex items-center gap-1'>
        <li>
          <button
            className={`${pageButtonClass} hover:bg-surface-muted`}
            onClick={() => handlePageChange(goToPrevPage)}
            disabled={currentPage === 1}
            aria-label='Previous page'
          >
            <HiChevronLeft />
            <span className='hidden sm:inline ml-1'>Previous</span>
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`${pageButtonClass} ${currentPage === page ? 'bg-ink text-white' : 'hover:bg-surface-muted'}`}
              onClick={() => handlePageChange(() => goToPage(page))}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`${pageButtonClass} hover:bg-surface-muted`}
            onClick={() => handlePageChange(goToNextPage)}
            disabled={currentPage === totalPages}
            aria-label='Next page'
          >
            <span className='hidden sm:inline mr-1'>Next</span>
            <HiChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
