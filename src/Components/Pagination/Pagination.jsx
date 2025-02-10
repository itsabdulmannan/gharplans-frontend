import React from "react";

const Pagination = ({ offset, limit, total, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;

  const handlePrevious = () => {
    if (offset >= limit) {
      onPageChange(offset - limit); // Move to the previous page
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(offset + limit); // Move to the next page
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 p-4 bg-white shadow-md rounded-lg">
      <span className="text-gray-700">Total Records: {total}</span>

      <div className="flex space-x-4">
        <button
          className={`py-2 px-4 rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`py-2 px-4 rounded ${
            currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
