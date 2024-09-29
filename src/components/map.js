import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import restaurantData from '../data/restaurants.json'

const INITIAL_CENTER = [-118.78230, 34.14565]
const INITIAL_ZOOM = 16.5

const Map = () => {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const bounds = [
      [-118.98506, 33.99237],
      [-118.59421, 34.32050]
    ]

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })

    mapRef.current.setMaxBounds(bounds)

    restaurantData.forEach(restaurant => {
      new mapboxgl.Marker()
        .setLngLat([restaurant.longitude, restaurant.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3>${restaurant.name}</h3><p>${restaurant.signatureDish}</p>`
          )
        )
        .addTo(mapRef.current)
    })

    return () => mapRef.current.remove()
  }, [])

  const handleReset = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })
  }

  return (
    <>
      <div ref={mapContainerRef} id="mapContainer" />
      <button className="reset" onClick={handleReset}>
        reset
      </button>
    </>
  )
}

export default Map
