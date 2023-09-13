import React, { useState, useEffect } from "react";
import axios from "axios";
import sun from './assets/sun.svg';
import moon from './assets/moon.svg';
function BeerList() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    axios.get("https://api.punkapi.com/v2/beers").then((response) => {
      setBeers(response.data);
      setFilteredBeers(response.data);
    });
    document.body.classList.toggle("dark", darkMode)
  }, [darkMode]);

  // useEffect(()=>{
  //   document.body.classList.toggle("dark", darkMode)
  // }, [darkMode])

  useEffect(() => {
    const filtered = beers.filter((beer) =>
      beer.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBeers(filtered);
  }, [search, beers]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const [expandedBeer, setExpandedBeer] = useState(null);

  const toggleExpand = (beerId) => {
    if (expandedBeer === beerId) {
      setExpandedBeer(null);
    } else {
      setExpandedBeer(beerId);
    }
  };

  const changeMode = ()=>{
    setDarkMode(!darkMode);
  }
  return (
    <div>
      <button onClick={changeMode} className="fixed right-5 top-5">
        {darkMode? <img src={sun} width={50} alt="sun"/>:<img width={50} src={moon} alt="moon"/>}
      </button>
      <div className="flex items-center justify-center">
        <div class="relative w-1/3">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for a beer..."
            value={search}
            onChange={handleSearchChange}
            id="default-search"
            class="block my-5 w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="card-group max-w-[1320px] mx-auto grid xl:grid-cols-3 lg:grid-cols-2 md:grid-col-1 gap-20">
          {filteredBeers.map(
            (beer) =>
              beer.image_url !== "https://images.punkapi.com/v2/keg.png" && (
                <div
                  key={beer.id}
                  className="w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
                >
                  <div className="flex justify-evenly pt-5">
                    <img
                      width={"100rem"}
                      src={beer.image_url}
                      alt={beer.name}
                    />
                  </div>

                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {beer.name}
                      </h5>
                      <div className="text-white">{beer.first_brewed}</div>
                    </a>
                    <p
                      className={`mb-3 font-normal text-gray-700 dark:text-gray-400 ${
                        expandedBeer === beer.id ? "block" : "hidden"
                      }`}
                    >
                      {beer.description}
                    </p>
                    <a
                      href="#"
                      onClick={() => toggleExpand(beer.id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {expandedBeer === beer.id ? "Read Less" : "Read More"}
                      <svg
                        className={`w-3.5 h-3.5 ml-2 transform ${
                          expandedBeer === beer.id ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default BeerList;
