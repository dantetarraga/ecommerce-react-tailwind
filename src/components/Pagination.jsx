const Pagination = ({ currentPage, totalPages, goToNextPage, goToPrevPage, goToPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className='my-10 flex justify-end'>
      <ul className='inline-flex -space-x-px text-base h-10'>
        <li>
          <button
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-e-0 border-gray-300 rounded-s-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'hover:text-gray-700 hover:bg-gray-100'}`}
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {
          pages.map((page) => (
            <li key={page}>
              <button
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === page && 'text-black bg-gray-200'}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            </li>
          ))
        }
        <li>
          <button
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 rounded-e-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'hover:text-gray-700 hover:bg-gray-100'}`}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
