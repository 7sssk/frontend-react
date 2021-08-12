import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  Marker,
} from 'mapbox-gl';
import { LatLng } from 'src/models/map.model';
import { useAppSelector } from 'src/shared/hooks';
import { theme } from 'src/theme/material-theme';
import { environment } from 'src/environments/environment';

type Props = {
  onClick: (arg: LatLng) => void;
};

export const ApplicationMap: FC<Props> = ({ onClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [_map, setMap] = useState(null);
  const { selectedRole } = useAppSelector((s) => s.sharedReducer);

  const initMap = useMemo(
    () => (mapContainer: HTMLDivElement, { longitude, latitude }) => {
      const map = new Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 15,
        attributionControl: true,
        accessToken:
          'pk.eyJ1Ijoia293cGVuZGkiLCJhIjoiY2txNWZzeTdvMTM5ajJwbzB2ZXdzYjJ0dSJ9.5OgNiQgqr3qBkVDPZl2yKA',
      });

      map.addControl(
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

      map.addControl(new FullscreenControl());
      map.addControl(new NavigationControl());

      let marker: Marker;

      map.on('click', ({ lngLat }) => {
        onClick(lngLat);
        if (marker) {
          marker.remove();
        }
        marker = new Marker({
          color: selectedRole.id === 1 ? theme.palette.primary.main : 'green',
        })
          .setLngLat(lngLat)
          .addTo(map);
      });

      setMap(map);

      return map;
    },
    [selectedRole?.id, onClick]
  );

  useEffect(() => {
    if (_map) {
      return;
    }

    if (!environment.production) {
      initMap(mapContainer.current, {
        longitude: 71.42034199999999,
        latitude: 51.1130742,
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      const map = initMap(mapContainer.current, { longitude, latitude });

      return () => {
        map.remove();
      };
    });
  }, [_map, initMap]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
};
