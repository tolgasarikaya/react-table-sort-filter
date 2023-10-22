import { useState, useEffect } from "react";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
function App() {
  const [products, setProducts] = useState([]);
  const [sortPriceToHigher, setSortPriceToHigher] = useState(null);
  const [sortNameToHigher, setSortNameToHigher] = useState(null);
  const [sortDateToHigher, setSortDateToHigher] = useState(null);

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
      products.sort((a, b) => a.product_price - b.product_price);
    } else {
      products.sort((a, b) => b.product_price - a.product_price);
    }
  };

  const sortNameHandler = () => {
    setSortNameToHigher(!sortNameToHigher);
    setSortPriceToHigher(null);
    setSortDateToHigher(null);
    if (!sortNameToHigher) {
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
      });
    } else {
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
      });
    }
  };

  const sortDateHandler = () => {
    setSortDateToHigher(!sortDateToHigher);
    setSortNameToHigher(null);
    setSortPriceToHigher(null);
    if (!sortDateToHigher) {
      products.sort((a, b) => a.released_date - b.released_date);
    } else {
      products.sort((a, b) => b.released_date - a.released_date);
    }
  };

  return (
    <table>
      <thead>
        <tr className="bg-sky-500 text-white ">
          <th className="text-start pr-10 ">
            <div className="flex flex-col">
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
            </div>
          </th>
          <th className="text-start pr-10">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
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
            </div>
          </th>
          <th className="text-start pr-10 ">
            <div className="flex flex-col">
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
            </div>
          </th>
        </tr>
      </thead>
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
    </table>
  );
}

export default App;
