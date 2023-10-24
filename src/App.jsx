import { useState, useEffect, useRef } from "react";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortPriceToHigher, setSortPriceToHigher] = useState(null);
  const [sortNameToHigher, setSortNameToHigher] = useState(null);
  const [sortDateToHigher, setSortDateToHigher] = useState(null);

  const nameInputRef = useRef(null);
  const minPriceInputRef = useRef(null);
  const maxPriceInputRef = useRef(null);
  const dateStartInputRef = useRef(null);
  const dateEndInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        jsonData.result.map(
          (prod) => (prod.released_date = new Date(prod.released_date))
        );
        setProducts(jsonData.result);
        setFilteredProducts(jsonData.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const sortPriceHandler = () => {
    setSortPriceToHigher(!sortPriceToHigher);
    setSortNameToHigher(null);
    setSortDateToHigher(null);
    if (!sortPriceToHigher) {
      setProducts(products.sort((a, b) => a.product_price - b.product_price));
    } else {
      setProducts(products.sort((a, b) => b.product_price - a.product_price));
    }
  };

  const sortNameHandler = () => {
    setSortNameToHigher(!sortNameToHigher);
    setSortPriceToHigher(null);
    setSortDateToHigher(null);
    if (!sortNameToHigher) {
      setProducts(
        products.sort((a, b) => {
          const nameA = a.product_name.toUpperCase();
          const nameB = b.product_name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
      );
    } else {
      setProducts(
        products.sort((a, b) => {
          const nameA = a.product_name.toUpperCase();
          const nameB = b.product_name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        })
      );
    }
  };

  const sortDateHandler = () => {
    setSortDateToHigher(!sortDateToHigher);
    setSortNameToHigher(null);
    setSortPriceToHigher(null);
    if (!sortDateToHigher) {
      setProducts(products.sort((a, b) => a.released_date - b.released_date));
    } else {
      setProducts(products.sort((a, b) => b.released_date - a.released_date));
    }
  };

  const filterHandler = () => {
    setProducts(
      filteredProducts
        .filter(
          (el) =>
            nameInputRef.current.value.trim() === "" ||
            el.product_name
              .toLowerCase()
              .includes(nameInputRef.current.value.toLowerCase()) === true
        )
        .filter(
          (el) =>
            minPriceInputRef.current.value.trim() === "" ||
            el.product_price >= Number(minPriceInputRef.current.value)
        )
        .filter(
          (el) =>
            maxPriceInputRef.current.value.trim() === "" ||
            el.product_price <= Number(maxPriceInputRef.current.value)
        )
        .filter(
          (el) =>
            dateStartInputRef.current.value.trim() === "" ||
            new Date(el.released_date).getTime() >=
              new Date(dateStartInputRef.current.value).getTime()
        )
        .filter(
          (el) =>
            dateEndInputRef.current.value.trim() === "" ||
            new Date(el.released_date).getTime() <=
              new Date(dateEndInputRef.current.value).getTime()
        )
    );
  };

  return (
    <table>
      <thead>
        <tr className="bg-sky-500 text-white ">
          <th className="text-start pr-10 ">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                Product Name
                {sortNameToHigher === null && (
                  <FaSort
                    className="cursor-pointer"
                    onClick={() => {
                      setSortNameToHigher(true);
                      sortNameHandler();
                    }}
                  />
                )}
                {sortNameToHigher === true && (
                  <FaArrowDownShortWide
                    className="cursor-pointer"
                    onClick={sortNameHandler}
                  />
                )}
                {sortNameToHigher === false && (
                  <FaArrowUpWideShort
                    className="cursor-pointer"
                    onClick={sortNameHandler}
                  />
                )}
              </div>
              <input
                type="text"
                onChange={filterHandler}
                ref={nameInputRef}
                placeholder="Filter by name"
                className="font-normal text-gray-700 w-2/3 rounded pl-1 outline-0	"
              ></input>
            </div>
          </th>
          <th className="text-start pr-10  w-60	">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2 ">
                Product Price
                {sortPriceToHigher === null && (
                  <FaSort
                    className="cursor-pointer"
                    onClick={() => {
                      setSortPriceToHigher(true);
                      sortPriceHandler();
                    }}
                  />
                )}
                {sortPriceToHigher === true && (
                  <FaArrowDownShortWide
                    className="cursor-pointer"
                    onClick={sortPriceHandler}
                  />
                )}
                {sortPriceToHigher === false && (
                  <FaArrowUpWideShort
                    className="cursor-pointer"
                    onClick={sortPriceHandler}
                  />
                )}
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="number"
                  onChange={filterHandler}
                  placeholder="Min price"
                  ref={minPriceInputRef}
                  className="font-normal w-1/2 text-gray-700 inline-block rounded pl-1 outline-0	"
                ></input>
                <input
                  type="number"
                  onChange={filterHandler}
                  placeholder="Max price"
                  ref={maxPriceInputRef}
                  className="font-normal w-1/2 text-gray-700 inline-block  rounded pl-1 outline-0	"
                ></input>
              </div>
            </div>
          </th>
          <th className="text-start pr-10 ">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                Released Date
                {sortDateToHigher === null && (
                  <FaSort
                    className="cursor-pointer"
                    onClick={() => {
                      setSortDateToHigher(true);
                      sortDateHandler();
                    }}
                  />
                )}
                {sortDateToHigher === true && (
                  <FaArrowDownShortWide
                    className="cursor-pointer"
                    onClick={sortDateHandler}
                  />
                )}
                {sortDateToHigher === false && (
                  <FaArrowUpWideShort
                    className="cursor-pointer"
                    onClick={sortDateHandler}
                  />
                )}
              </div>
              <div className="flex flex-row gap-2">
                <label className="flex flex-row gap-2 items-center">
                  <span className="font-normal">Start Date:</span>
                  <input
                    type="date"
                    onChange={filterHandler}
                    placeholder="Start Date"
                    ref={dateStartInputRef}
                    className="font-normal w-28 text-gray-700 inline-block rounded pl-1 outline-0	"
                  ></input>
                </label>
                <label className="flex flex-row gap-2 items-center">
                  <span className="font-normal">End Date:</span>
                  <input
                    type="date"
                    onChange={filterHandler}
                    placeholder="End Date"
                    ref={dateEndInputRef}
                    className="font-normal w-28 text-gray-700 inline-block  rounded pl-1 outline-0	"
                  ></input>
                </label>
              </div>
            </div>
          </th>
        </tr>
      </thead>

      {products.length === 0 ? (
        <tfoot>
          <tr className="text-gray-800 ">No product to show.</tr>
        </tfoot>
      ) : (
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="border-b-2">
              <td className="pr-10">{item.product_name}</td>
              <td className="pr-10">{item.product_price}$</td>
              <td className="pr-10">
                {item.released_date.toLocaleString("tr-TR", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZone: "UTC",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

export default App;
