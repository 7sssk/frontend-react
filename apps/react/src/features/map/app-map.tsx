import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
} from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { fetchApplications, setAppMapAction } from 'src/redux';
import { environment } from 'src/environments/environment';

export const AppMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const appMapState = useAppSelector((s) => s.appMapReducer);

  const dispatch = useAppDispatch();

  const initMap = useCallback(
    (mapContainer: HTMLDivElement, { longitude, latitude }) => {
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

      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });

      dispatch(setAppMapAction(map));
      dispatch(fetchApplications());
    },
    [dispatch]
  );

  useEffect(() => {
    if (appMapState.map) {
      return;
    }

    if (!environment.production) {
      return initMap(mapContainer.current, {
        longitude: 71.42034199999999,
        latitude: 51.1130742,
      });
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log(
        '🚀 ~ file: app-map.tsx ~ line 62 ~ navigator.geolocation.getCurrentPosition ~ coords',
        coords
      );
      const { longitude, latitude } = coords;
      initMap(mapContainer.current, { longitude, latitude });
    });
  }, [appMapState.map, initMap]);

  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};
