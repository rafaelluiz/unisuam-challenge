"use client";

const Pagination = ({
  currentPage,
  total,
  setPage,
}: {
  currentPage: number;
  total: number;
  setPage: (page: number) => void;
}) => {
  const numberPerPages = 10;
  const firstRecord = (currentPage - 1) * numberPerPages + 1;
  const totalRecordsShowed =
    (currentPage - 1) * numberPerPages + numberPerPages;
  const totalPages = Math.ceil(total / numberPerPages);

  const getPageNumbers = () => {
    const maxVisible = 5;
    const totalPages = Math.ceil(total / numberPerPages);
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pages = getPageNumbers();

  const classActived =
    "hover:text-brand-500 dark:hover:text-brand-500 text-brand-500 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/[0.08] text-sm font-medium hover:bg-blue-500/[0.08]";
  const classNotActived =
    "hover:text-brand-500 dark:hover:text-brand-500 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-500/[0.08] dark:text-gray-400 cursor-pointer";

  return (
    <>
      <div className=" border-gray-100 py-4 pr-4 pl-[18px] dark:border-gray-800">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <p className="border-b border-gray-100 pb-3 text-center text-sm font-medium text-gray-500 xl:border-b-0 xl:pb-0 xl:text-left dark:border-gray-800 dark:text-gray-400">
            Exibindo <span x-text="startEntry">{firstRecord}</span> -{" "}
            <span x-text="endEntry">
              {totalRecordsShowed <= total ? totalRecordsShowed : total}
            </span>{" "}
            de <span x-text="totalEntries">{total}</span> registros
          </p>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-0.5 pt-4 xl:justify-end xl:pt-0">
              <button
                className="shadow-theme-xs disabled:cursor-default cursor-pointer mr-2.5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                disabled={currentPage === 1}
                onClick={(e) => handleChange(e, currentPage - 1)}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715C2.58301 9.99766 2.58301 9.99817 2.58301 9.99868Z"
                    fill=""
                  ></path>
                </svg>
              </button>

              {pages.map((page) => (
                <button
                  key={page}
                  className={
                    currentPage === page ? classActived : classNotActived
                  }
                  onClick={(e) => handleChange(e, page)}
                  disabled={currentPage === page}
                >
                  <span x-text="page">{page}</span>
                </button>
              ))}

              <button
                className="shadow-theme-xs disabled:cursor-default cursor-pointer ml-2.5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                disabled={currentPage === totalPages}
                onClick={(e) => handleChange(e, currentPage + 1)}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715C17.4175 9.99763 17.4175 9.99812 17.4175 9.9986Z"
                    fill=""
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
