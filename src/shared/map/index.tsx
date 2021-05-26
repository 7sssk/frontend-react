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

export const Map = () => {
  const [_, setMapInstance] = useContext(MapContext)

  useEffect(() => {
    let map: any

    map = DG.map('map-container', {
      center: [51.15, 71.42],
      zoom: 13,
      geoclicker: true,
      inertia: true,
      keyboard: true,
    })

    DG.control.zoom({ position: 'bottomright' })
    DG.control.location({ position: 'bottomright' }).addTo(map)
    DG.control.scale().addTo(map)
    DG.control.ruler({ position: 'bottomleft' }).addTo(map)
    DG.control.traffic().addTo(map)

    setMapInstance(map)

    return () => map && map.destroy()
  }, [setMapInstance])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapWrapper />
    </div>
  )
}
