import { FC, useEffect, useRef, useState } from 'react';
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  Marker,
} from 'mapbox-gl';
import { LatLng } from 'src/models/map.model';

type Props = {
  onClick: (arg: LatLng) => void;
};

export const ApplicationMap: FC<Props> = ({ onClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      const _map = initMap(mapContainer.current, { longitude, latitude });

      _map.addControl(
        new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          fitBoundsOptions: {
            animate: false,
            zoom: 15,
          },
          showAccuracyCircle: false,
        })
      );

      _map.addControl(new FullscreenControl());
      _map.addControl(new NavigationControl());

      let marker: Marker;

      _map.on('click', ({ lngLat }) => {
        onClick(lngLat);
        if (marker) {
          marker.remove();
        }
        marker = new Marker().setLngLat(lngLat).addTo(_map);
      });

      setMap(map);

      return () => {
        _map.remove();
      };
    });
  }, []);

  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};

const initMap = (mapContainer: HTMLDivElement, { longitude, latitude }) => {
  return new Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 15,
    attributionControl: true,
    accessToken:
      'pk.eyJ1Ijoia293cGVuZGkiLCJhIjoiY2txNWZzeTdvMTM5ajJwbzB2ZXdzYjJ0dSJ9.5OgNiQgqr3qBkVDPZl2yKA',
  });
};
