import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState();
  const[singleCountry,setSingleCountry] = useState('')
  const [cities,setCities] = useState([])
  const [singleCity,setSingleCity]=useState('')
  const[submit ,setSubmit]= useState(false)

  const fetchCountries = async () => {
    try {
      const country = await axios.get('https://countriesnow.space/api/v0.1/countries');
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);


  const fetchCities =(country )=>{

    setSubmit(false) //this is used so that massage will disappear when you change the country
    setSingleCity(null) 
    setSingleCountry(country)
    const findCities = countries.find((c)=>c.country===country)
    // console.log(findcities)
    setCities(findCities.cities)



  }

  const handleClick = ()=>{
    if (singleCity && singleCountry){
      setSubmit(true)

    }
  }

  return (
    <div className="App">
      <h1>Select Your Home Town</h1>
      <div >
        {countries && (
           <select  onChange={(e)=>fetchCities(e.target.value)} value={singleCountry}>
           <option disabled selected hidden>
             select your country
           </option>
            {countries.map((country) => (
              <option key={`${country.country}`} value={country.country}>{country.country}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        {cities && (
          <select onChange={(e)=>setSingleCity(e.target.value)} value={singleCity}>
            <option disabled selected hidden>
             select your city
           </option>
           {cities.map((city)=>(
            <option value={city} key={city}>{city}</option>
           ))}



          </select>
        )}
      </div>

      <div><button onClick={handleClick}>Go</button></div>

      {/* {submit ? <h3>your county is {singleCountry} and your city is {singleCity}</h3> : nulls} */}
      {submit && (<h3>your county is {singleCountry} and your city is {singleCity}</h3>)}
    </div>
  );
}

export default App;




