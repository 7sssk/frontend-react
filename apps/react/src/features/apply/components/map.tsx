import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Map, GeolocateControl, Marker } from 'mapbox-gl';
import { LatLng } from 'src/models/map.model';
import { useAppSelector } from 'src/shared/hooks';
import { environment } from 'src/environments/environment';
import { isMobile } from 'react-device-detect';
import { Button, IconButton } from '@material-ui/core';
import { IoMdClose } from 'react-icons/io';
import { theme } from 'src/theme/material-theme';

type Props = {
  onClick: (arg: LatLng) => void;
  onClose: () => void;
};

export const ApplicationMap: FC<Props> = ({ onClick, onClose }) => {
  const [latlng, setLatLng] = useState<LatLng>();
  const mapContainer = useRef<HTMLDivElement>(null);

  const [_map, setMap] = useState(null);
  const { selectedRole } = useAppSelector((s) => s.sharedReducer);

  const setPosition = () => {
    onClick(latlng);
  };

  const initMap = useMemo(
    () => ({ longitude, latitude }) => {
      const map = new Map({
        container: mapContainer.current,
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
          trackUserLocation: true,
          showUserHeading: true,
          showAccuracyCircle: true,
        })
      );

      // const el = document.createElement('div');
      // el.className =
      //   selectedRole.id === 1 ? 'fas fa-car fa-3x' : 'fas fa-walking fa-3x';

      let marker = new Marker({ color: theme.palette.primary.main });

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLatLng({ lat: latitude, lng: longitude });
        marker.setLngLat({ lat: latitude, lng: longitude }).addTo(map);
      });

      map.on('click', ({ lngLat }) => {
        setLatLng(lngLat);
        marker.remove();
        marker.setLngLat(lngLat).addTo(map);
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

    if (!environment.production && isMobile) {
      initMap({
        longitude: 71.42034199999999,
        latitude: 51.1130742,
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      const map = initMap({ longitude, latitude });

      return () => {
        map.remove();
      };
    });
  }, [_map, initMap]);

  return (
    <>
      <div
        ref={mapContainer}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
      <div
        style={{
          background: '#fff',
          position: 'absolute',
          left: 20,
          top: 20,
          borderRadius: 50,
        }}
      >
        <IconButton color="primary" onClick={onClose}>
          <IoMdClose size="1.4em" />
        </IconButton>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 2,
          background: '#fff',
          paddingTop: 7,
          paddingBottom: 7,
        }}
      >
        <Button
          variant="contained"
          disableElevation
          color="primary"
          fullWidth
          disabled={!latlng}
          onClick={setPosition}
        >
          Готово
        </Button>
      </div>
    </>
  );
};
