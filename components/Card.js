import { BsSpeedometer, BsFillCloudHazeFill } from 'react-icons/bs'

import {
  FaTemperatureLow,
  FaTemperatureHigh,
  FaTachometerAlt,
  FaCompass,
  FaAngellist,
  FaThermometerHalf,
  FaGlobeAmericas,
} from 'react-icons/fa'

const Card = ({ item }) => {
  let centigrade = Math.floor(((item.main.temp - 32) * 5) / 9)
  let min = Math.floor(((item.main.temp_min - 32) * 5) / 9)
  let max = Math.floor(((item.main.temp_max - 32) * 5) / 9)
  let psi = Math.floor(item.main.pressure * 0.0145038)
  let kmph = Math.floor(item.wind.speed * 1.60934)
  let gust = Math.floor(item.wind.gust * 1.60934)

  return (
    <>
      <div className='card' key={item.id}>
        <h3 className='cityy'>
          <FaGlobeAmericas /> {item.name}
        </h3>
        <div className='sky'>
          <h6>Weather - {item.weather[0].description} </h6>{' '}
          <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt='logo'
          />
        </div>

        <div className='box3'>
          <h5 className='cord'>
            <FaGlobeAmericas /> Coordinates - Latitude {item.coord.lat}{' '}
            Longitude {item.coord.lon}
          </h5>
          <div className='temp'>
            <h5>
              <FaThermometerHalf /> Temperature - {item.main.temp} °F |{' '}
              {centigrade} °C{' '}
            </h5>{' '}
            <h5>
              {' '}
              <FaAngellist /> Feels like - {item.main.temp} °F | {centigrade} °C
            </h5>{' '}
            <h5>
              {' '}
              <FaTemperatureLow /> Temperature Minimum - {item.main.temp_min} °F
              | {min} °C
            </h5>{' '}
            <h5>
              {' '}
              <FaTemperatureHigh /> Temperature Maximum - {
                item.main.temp_max
              }{' '}
              °F | {max} °C{' '}
            </h5>{' '}
            <h5>
              {' '}
              <BsFillCloudHazeFill /> Pressure - {item.main.pressure} mbar |{' '}
              {psi} psi
            </h5>
          </div>
          <div className='wind'>
            <h5>
              <FaTachometerAlt /> Wind Speed - {item.wind.speed} m/h | {kmph}{' '}
              km/h
            </h5>
            <h5>
              <FaCompass /> Wind Deg - {item.wind.deg}
            </h5>
            
              {(item.wind.gust==null)?null:<h5><BsSpeedometer /> Wind Gust - {item.wind.gust} mph | {gust} kmph</h5>}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
