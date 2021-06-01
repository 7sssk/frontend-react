import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import DG from '2gis-maps'
import { createContext } from 'react'
import { useContext } from 'react'

export const MapContext = createContext<[any, Dispatch<SetStateAction<any>>]>(null)

export const MapProvider: React.FC = ({ children }) => {
  const [map, setMap] = useState<any>(null)

  return <MapContext.Provider value={[map, setMap]}>{children}</MapContext.Provider>
}

const MapWrapper = memo(
  () => {
    return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>
  },
  () => true
)

export const AppMap = () => {
  const [_, setMapInstance] = useContext(MapContext)

  useEffect(() => {
    let map: any

    map = DG.map('map-container', {
      center: [51.15, 71.42],
      zoom: 13,
      geoclicker: true,
      zoomControl: false,
    })

    map
      .locate({ setView: true, enableHighAccuracy: true })
      .on('locationfound', function (e) {
        DG.marker([e.latitude, e.longitude]).addTo(map)
      })
      .on('locationerror', function (e) {
        DG.popup()
          .setLatLng(map.getCenter())
          .setContent('Доступ к определению местоположения отключён')
          .openOn(map)
      })

    DG.control.traffic({ position: 'topright' }).addTo(map)
    DG.control.location({ position: 'topright' }).addTo(map)
    DG.control.zoom({ position: 'bottomright' }).addTo(map)

    setMapInstance(map)

    return () => {
      map = null
    }
  }, [setMapInstance])

  return <MapWrapper />
}

export const useAppMap = () => useContext(MapContext)
