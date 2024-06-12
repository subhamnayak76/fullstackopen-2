// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const countyView = ({country}) =>{
//   return (
//     <>
//     <h2>{country.name.common}</h2>
//     <P>Capital : {country.capital}</P>
//     <p>Population : {country.population}</p>
//     <h3>Language</h3>
//     <ul>
//       {Object.value(country.languages).map(language => (
//         <li key = {language}>{language}</li>
//       ))}
//     </ul>
//     <img src={country.image.png} width='100' />
//     </>
//   )
// }

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [query, setQuery] = useState('');
//   const [seleted,setSelected] = useState([]);

//   useEffect(() => {
//     axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
//       .then(response => {
//         setCountries(response.data);
//       });
//   }, []);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const filteredCountries = countries.filter(country =>
//     country.name.common.toLowerCase().includes(query.toLowerCase())
//   );
//   const handler = (e) => {
//     console.log('button clicked', e.target);
    
//   }
//   let display;
//   if (filteredCountries.length > 10) {
//     display = <p>Too many matches, specify another filter</p>;
//   } else if (filteredCountries.length > 1) {
//     display = (
//       <ul>
//         {filteredCountries.map(country => (
//           <li key={country.cca3}>{country.name.common} <button onClick={handler}>show</button></li>
//         ))}
//       </ul>
//     );
//   } else if (filteredCountries.length === 1) {
//     const country = filteredCountries[0];
//     display = (
//       <div>
//         <h2>{country.name.common}</h2>
//         <p>Capital: {country.capital}</p>
//         <p>Population: {country.population}</p>
//         <h3>Languages</h3>
//         <ul>
//           {Object.values(country.languages).map(language => (
//             <li key={language}>{language}</li>
//           ))}
//         </ul>
        
//         <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
//       </div>
//     );
//   } else {
//     display = <p>No matches</p>;
//   }
//   if(countries.length > 0){
//     console.log('countries',`${countries[0].name.common} ${countries[0].name.languages}` );
//   }
// ;
//   // console.log('countries', countries);
//   if(countries.length > 0){
//     console.log('countries',countries[0].languages)
//   }
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter your country name"
//         value={query}
//         onChange={handleInputChange}
//       />
//       {}
//       {seleted && <countyView country ={countries}/>}
      
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from 'react';
import axios from 'axios';

function CountryView({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Languages:</p>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching the countries:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedCountry(null); // Reset selectedCountry when input changes
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your country name"
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {filteredCountries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleCountryClick(country)}>View</button>
          </li>
        ))}
      </ul>
      {selectedCountry && <CountryView country={selectedCountry} />} {/* Conditional rendering */}
    </div>
  );
}

export default App;
