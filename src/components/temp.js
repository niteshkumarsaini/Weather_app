import React, { useEffect } from 'react'

const Temp = () => {

  const [searchValue,setSearchValue]=React.useState('kashipur');
  const[tempInfo,setTempInfo]=React.useState({});
  const[weatherState,setWeatherState]=React.useState('');
const getWeatherInfo=async ()=>{
  try {
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1e4e30b80dfc057a1badc3cf78b382f4`;
    let res=await fetch(url);
    let data=await res.json();
   const{temp,pressure,humidity}=data.main;
   const {main:weatherMood,}=data.weather[0];
   const {name}=data;
   const {speed}=data.wind;
   const {country,sunset}=data.sys;

   const myWeatherInfo={
    temp,humidity,pressure,weatherMood,name,speed,country,sunset

   };
   
   setTempInfo(myWeatherInfo);



   

  } catch (error) {
    console.log(error)
    
  }

}
useEffect(()=>{
getWeatherInfo();

},[]);
React.useEffect(()=>{
  if(tempInfo.weatherMood){
    switch(tempInfo.weatherMood){
      case 'Clouds':
        setWeatherState('wi-day-cloudy')
        break;
      case 'Haze':
          setWeatherState('wi-fog')
          break;
      case 'Clear':
      setWeatherState('wi-day-sunny')
            break;
      case'Rain':
      setWeatherState('wi rain')
      break;
      default:
        setWeatherState('wi-day-sunny')
        break



      



    }

  }

 },[tempInfo.weatherMood])


  return (
    <>
    <div className="main">
    <div className="search">
      <input type="search" autoFocus id='search' placeholder='Search here..' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
      <button id='searchbtn' onClick={getWeatherInfo}>Search</button>
    
    </div>
    </div>
    <article>
    <section id='second'>
      <div id="outIcon">
        <i className={`wi ${weatherState}`}></i>

      </div>
      <div className="data">
        <div id="temp">{tempInfo.temp}&deg;</div>
       <div className="description">
        <div className="weatherCondi">{tempInfo.weatherMood}</div>
        <div className="place">{`${tempInfo.name}, ${tempInfo.country}`}</div>

       </div>
       <div className="date">{new Date().toLocaleString()}</div>
       </div>
       <div className="extra-temp">
        <div className="temp-info">
          <i className='wi wi-sunset'></i>
          <div className="tempmin">
            <div className="tempmintime">{`${new Date(tempInfo.sunset*1000).getHours()}:${new Date(tempInfo.sunset*1000).getMinutes()} PM`}</div>
            <div className="tempmindata">Sunset</div>
          </div>
          </div>

        <div className="temp-info">
          <i className='wi wi-humidity'></i>
          <div className="tempmin">
            <div className="tempmintime">{tempInfo.humidity}</div>
            <div className="tempmindata">Humidity</div>
          </div>
        </div>

        <div className="temp-info">
          <i className='wi wi-rain'></i>
          <div className="tempmin">
            <div className="tempmintime">Pressure</div>
            <div className="tempmindata">{tempInfo.pressure} MM</div>
          </div>
        </div>

        <div className="temp-info">
          <i className='wi wi-strong-wind'></i>
          <div className="tempmin">
            <div className="tempmintime">Wind</div>
            <div className="tempmindata">{tempInfo.speed}</div>
          </div>
        </div>

       </div>

      
    </section>
    
    </article>
    
    
    
    </>
  )
}

export default Temp
