import { memo, useEffect, useState } from 'react'
import DG from '2gis-maps'

const MapContainer: React.FC<{ container: string }> = ({ container }) => {
  return <div id={container} style={{ width: '100%', height: '100%' }}></div>
}

const MapWrapper = memo(MapContainer, () => true)

export const Map = ({ container }) => {
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    let map: any

    map = DG.map(container, {
      center: [51.15, 71.42],
      zoom: 13,
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

    DG.control.location({ position: 'topright' }).addTo(map)
    DG.control.zoom({ position: 'bottomright' }).addTo(map)

    setMap(map)

    return () => {
      map = null
    }
  }, [setMap, container])

  return <MapWrapper container={container} />
}
