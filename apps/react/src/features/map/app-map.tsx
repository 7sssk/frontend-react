import { useCallback, useEffect, useRef } from 'react';
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
} from 'mapbox-gl';
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { fetchApplicationsThunk, setAppMapAction } from 'src/redux';

export const AppMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const appMapState = useAppSelector((s) => s.appMapReducer);

  const dispatch = useAppDispatch();

  const initMap = useCallback(
    ({ longitude, latitude }) => {
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
          showAccuracyCircle: false,
        })
      );

      map.addControl(new FullscreenControl());
      map.addControl(new NavigationControl());

      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });

      dispatch(setAppMapAction(map));
      dispatch(fetchApplicationsThunk());
    },
    [dispatch]
  );

  useEffect(() => {
    if (appMapState.map) {
      return;
    }


    if (!navigator?.geolocation?.getCurrentPosition) {
      initMap({
        longitude: 71.42034199999999,
        latitude: 51.1130742,
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      initMap({ longitude, latitude });
    });
  }, [appMapState.map, initMap]);

  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};
