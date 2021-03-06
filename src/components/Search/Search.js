import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoApiOptions, GEO_API_URL } from '../../api'

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null)

  function handleOnChange(searchData) {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  function loadOptions(inputValue) {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }
          }),
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <AsyncPaginate
      placeholder='Seach for City'
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}
