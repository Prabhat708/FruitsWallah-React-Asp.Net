import React from 'react'

const Pagination = ({ currentPage, setCurrentPage, pages }) => {
  return (
    <>
      <div className="pagination-container">
        <span
          className="btn btn-outline-secondary pagination-btn"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage == 1}
        >
          «
        </span>

        <span
          className="btn btn-outline-secondary pagination-btn"
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage == 1}
        >
          ‹
        </span>

        {pages.map((page, index) => {
          const showPage =
            page == 1 || page == pages.length || Math.abs(currentPage - page) <= 1;
          if (
            (page === 2 && currentPage > 4) ||(page === pages.length - 1 && currentPage < pages.length - 3)
          ) {
            return (
              <span key={`dots-${page}`} className="pagination-ellipsis">
                ...
              </span>
            );
          }

          if (showPage) {
            return (
              <span
                key={index}
                className={`btn mx-1 pagination-btn ${
                  currentPage === page ? "btn-primary" : "btn-outline-warning"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
            );
          }

          return null;
        })}

        {/* Next Page */}
        <span
          className="btn btn-outline-secondary pagination-btn"
          onClick={() =>
            currentPage < pages.length && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === pages.length}
        >
          ›
        </span>

        {/* Last Page */}
        <span
          className="btn btn-outline-secondary pagination-btn"
          onClick={() => setCurrentPage(pages.length)}
          disabled={currentPage === pages.length}
        >
          »
        </span>
      </div>
    </>
  );
};

export default Pagination
