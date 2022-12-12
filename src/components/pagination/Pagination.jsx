import React, { useState } from 'react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Pagination = ({ totalItems, itemsPerPage, neighbours, setOffset }) => {
  const items = [];
  const [current, setCurrent] = useState(1);
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const end = Math.min(Math.max(neighbours * 2 + 2, neighbours + current + 1), totalPage + 1);
  const start = Math.min(Math.max(end - (neighbours * 2 + 1), 1), Math.max(current - neighbours, 1));

  for (let i = start; i < end; i++) {
    items.push(
      <Link
        key={`Paginador-${i}`}
        onClick={() => {
          setCurrent(i);
          setOffset((i - 1) * itemsPerPage);
        }}
        href="#"
        aria-current="page"
        className={`${getClassActive(i)} relative inline-flex items-center px-[23px] py-[0px] mx-2 border text-lg font-semibold rounded-xl`}
      >
        {i}
      </Link>
    );
  }

  function getClassActive(i) {
    return i === current ? 'z-10 bg-indigo-50 border-indigo-500 font-semibold text-white ' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
  }

  function prevPage() {
    if (current > 1) {
      setCurrent(current - 1);
      setOffset((current - 2) * itemsPerPage);
    }
  }

  function nextPage() {
    if (current < totalPage) {
      setCurrent(current + 1);
      setOffset(current * itemsPerPage);
    }
  }

  return (
    <div className="flex flex-col text-center w-full">
      <div className="bg-white px-4 py-3 flex items-center justify-center  sm:px-6">
        <div className=" sm:flex-1 sm:flex sm:items-center sm:justify-center">
          <div>
            <nav className="relative z-0 flex justify-between rounded-md shadow-sm " aria-label="Pagination">
              <Link
                onClick={() => prevPage()}
                href="#"
                className="relative inline-flex items-center px-2 py-2 "
              >
                <span className="sr-only">Previous</span>
                <ArrowLeftCircleIcon className="h-10 w-10" aria-hidden="true" />
              </Link>
              {items}
              <Link
                onClick={() => nextPage()}
                href="#"
                className="relative inline-flex items-center px-2 py-2  "
              >
                <span className="sr-only">Next</span>
                <ArrowRightCircleIcon className="h-10 w-10" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{itemsPerPage * (current - 1) + 1}</span> de{' '}
          <span className="font-medium">{current * itemsPerPage < totalItems ? current * itemsPerPage : totalItems}</span> de <span className="font-medium">{totalItems}</span> resultados
        </p>
      </div>
    </div>
  );
};

export default Pagination;
