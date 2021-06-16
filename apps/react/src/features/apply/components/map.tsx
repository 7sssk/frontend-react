import { FC, memo, useCallback, useEffect, useState } from 'react';
import DG from '2gis-maps';
import { LatLng } from 'src/models/map.model';

const MapContainer: React.FC = () => {
  return (
    <div id="application-map" style={{ width: '100%', height: '100%' }}></div>
  );
};

const MapWrapper = memo(MapContainer, () => true);

type Props = {
  onClick: (v: LatLng) => void;
};

export const Map: FC<Props> = ({ onClick }) => {
  const [map, setMap] = useState<any>(null);

  const _onClick = useCallback(onClick, [onClick]);

  useEffect(() => {
    const map = DG.map('application-map', {
      center: [51.15, 71.42],
      zoom: 13,
      zoomControl: false,
    });

    map
      .locate({ setView: true, enableHighAccuracy: true })
      .on('locationfound', (e) => e)
      .on('locationerror', function (e) {
        DG.popup()
          .setLatLng(map.getCenter())
          .setContent('Доступ к определению местоположения отключён')
          .openOn(map);
      });

    DG.control.location({ position: 'topright' }).addTo(map);
    DG.control.zoom({ position: 'bottomright' }).addTo(map);

    let marker: any;

    map.on('click', ({ latlng: { lat, lng } }) => {
      if (marker) {
        marker.remove();
      }
      marker = DG.marker([lat, lng]).addTo(map);
      _onClick({ lat, lng });
    });

    setMap(map);

    return () => {
      map.remove();
    };
  }, [setMap, _onClick]);

  return <MapWrapper />;
};
