import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion'
import './Forecast.css'

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export default function Forecast({ data }) {
  const dayInWeek = new Date().getDay()
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  )

  return (
    <>
      <label className='title'>Daily Forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item'>
                  <img
                    alt='weather'
                    className='icon-small'
                    src={`/icons/${item.weather[0].icon}.png`}
                  />
                  <label className='day'>{forecastDays[idx]}</label>
                  <label className='description'>
                    {item.weather[0].description}
                  </label>
                  <label className='min-max'>
                    {Math.round(item.main.temp_min)}°C /
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel>
              <div className='daily-details-grid'>
                <div className='daily-details-grid-item'>
                  <label>Feels Like</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label>Wind Speed</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label>Cloud Cover</label>
                  <label>{item.clouds.all}%</label>
                </div>

                <div className='daily-details-grid-item'>
                  <label>Sea Level</label>
                  <label>{item.main.sea_level}m</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
