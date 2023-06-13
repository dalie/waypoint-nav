import ReactMap, { ViewState } from "react-map-gl";
import styles from "./map.module.scss";
import { useRecoilValue } from "recoil";
import { locationState } from "src/app/store/location.atom";
import { useEffect, useState } from "react";

/* eslint-disable-next-line */
export interface MapProps {}

export function Map(props: MapProps) {
  const gpsLocation = useRecoilValue(locationState);

  useEffect(() => {
    setViewState({
      ...viewState,
      longitude: gpsLocation.longitude ?? 0,
      latitude: gpsLocation.latitude ?? 0,
      bearing: gpsLocation.heading ?? 0,
    });
  }, [gpsLocation]);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: gpsLocation.longitude ?? 0,
    latitude: gpsLocation.latitude ?? 0,
    bearing: gpsLocation.heading ?? 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
    zoom: 5,
  });

  return (
    <div className={styles.container}>
      <ReactMap
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoiZG9taW5pY2FsaWUiLCJhIjoiY2tuZzJ0YWtvMDcwejJxczlwa2NtbW0zeSJ9.ire3NMM19l7z4Zeqa20RVw"
        initialViewState={{
          longitude: gpsLocation.longitude,
          latitude: gpsLocation.latitude,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/dominicalie/cliqs2pyj01na01qga6p512xa"
        onMove={(evt) => setViewState(evt.viewState)}
      />
    </div>
  );
}

export default Map;
