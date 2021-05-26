import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { load } from '@2gis/mapgl'
import { Map as _Map } from '@2gis/mapgl/types'
import { createContext } from 'react'
import { useContext } from 'react'

export const MapContext = createContext<[_Map, Dispatch<SetStateAction<_Map>>]>(null)

export const MapProvider: React.FC = ({ children }) => {
  const [map, setMap] = useState<_Map>(null)

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
    let map: _Map
    load().then((mapglAPI) => {
      map = new mapglAPI.Map('map-container', {
        center: [71.43137692563238, 51.15505905916328],
        zoom: 12,
        key: '00848196-c4f9-4345-ad34-bc2cb09c9334',
        zoomControl: false,
        lang: 'ru-RU',
      })

      new mapglAPI.ZoomControl(map, { position: 'bottomRight' })
      new mapglAPI.TrafficControl(map, { position: 'bottomRight' })
      new mapglAPI.Control(map, '<button>asd</button>', {
        position: 'bottomRight',
      })
      setMapInstance(map)
    })

    return () => map && map.destroy()
  }, [setMapInstance])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapWrapper />
    </div>
  )
}

export const useMap = () => useContext(MapContext)
