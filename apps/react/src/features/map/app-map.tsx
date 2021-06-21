import { useEffect, useRef, useState } from 'react';
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
} from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useAppDispatch, useAppSelector } from 'src/shared/hooks';
import { setAppMapAction } from 'src/redux';

export const AppMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const appMapState = useAppSelector((s) => s.appMapReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appMapState.map) {
      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      const map = initMap(mapContainer.current, { longitude, latitude });

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

      dispatch(setAppMapAction(map));
    });
  }, [dispatch, appMapState.map]);

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
