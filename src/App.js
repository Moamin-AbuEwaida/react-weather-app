import React, {useState} from 'react'
import './App.css';

const api ={
  key: '4a7bbf40328f23ce3c6b08a74ef3024c',
  base: 'https://api.openweathermap.org/data/2.5/'
}
const App = ()=> {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=matric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }
  
  const dateBuilder = (d)=>{
    let months =["January","February","March","April","May","June",
    "July","August","September","October","November","December",];
    
    let days = ["Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"];

    let day = days[d.getDay()]; // returns a number from 0 to 6
    let date = d.getDate();
    let month = months[d.getMonth()]; //returns a number from 0 to 11
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? 
      ((weather.main.temp >16) ? 'App warm' : 'App')
      : 'App'}>
      <main>
        <div className="search-box">
          <input type="text" 
          className="search-bar" 
          placeholder="search ..."
          onChange={e=> setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined")? (
        <div>   
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{(Math.round(weather.main.temp))} °C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
