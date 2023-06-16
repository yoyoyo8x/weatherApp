import { WiThermometer } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbError404 } from "react-icons/tb";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";
import "./App.css";

const ListIcon = [
  {
    type: "Clear",
    img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  },
  {
    type: "Rain",
    img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
  },
  {
    type: "Snow",
    img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  },
  {
    type: "Clouds",
    img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    type: "Haze",
    img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  },
  {
    type: "Smoke",
    img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
  },
  {
    type: "Mist",
    img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  },
  {
    type: "Drizzle",
    img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  },
];

function App() {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setCity(newQuery);
    setQuery(newQuery);
    setSearchParams({
      query: newQuery,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=53d2b9e5ffc4c41135c1487777c28306`
      );
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (err) {}
  };

  return (
    <div className="w-screen h-screen bg-slate-500 flex ">
      <div className="w-full h-full lg:w-[50%] lg:h-[60%] xl:w-[30%] xl:h-[70%] bg-white m-auto">
        <form
          className="flex border-b-2 justify-between mb-10 px-10 py-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name=""
            id=""
            value={query}
            className="w-full text-lg outline-none"
            onChange={handleChange}
          />
          <div className="flex items-center" onClick={handleSubmit}>
            <FcSearch />
          </div>
        </form>
        {weather.message ? (
          <div className="text-center text-2xl font-medium">
            <div className="text-9xl flex justify-center">
              <TbError404 />
            </div>
            {weather.message}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {weather.name && (
              <div className="font-medium text-2xl mb-4">
                {weather.name}, {weather.sys && weather.sys.country}
              </div>
            )}
            {weather.weather && (
              <div>
                <img
                  className="w-[150px] h-[150px] mb-4"
                  src={
                    ListIcon.find(
                      (icon) => icon.type === weather.weather[0].main
                    ).img
                  }
                  alt=""
                />
                <div className="text-center mb-2 text-lg font-medium">
                  {weather.weather[0].main}
                </div>
              </div>
            )}
            {weather.main && (
              <div className="font-medium text-2xl mb-4 flex items-center">
                <WiThermometer />
                {weather.main.temp}
                <TbTemperatureCelsius />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
