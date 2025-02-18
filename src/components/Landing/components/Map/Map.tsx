import { FC, useMemo } from "react";
import "./Map.scss";
import { GeoObject, Placemark, YMaps, Map } from "@pbe/react-yandex-maps";

interface IMapComponentProps {
  coordinates: number[][] | undefined;
  mark: number[];
}

const MapComponent: FC<IMapComponentProps> = ({ coordinates, mark }) => {
  /// Централизация карты при добавлении/изменении метки
  const mapState = useMemo(
    () => ({
      center: mark.length > 1 ? mark : [53.507852, 49.420411],
      zoom: 10,
    }),
    [mark],
  );

  return (
    <YMaps query={{ apikey: "a9dd85e2-a26c-4e58-8272-7b4e0db88987" }}>
      <Map
        className="map"
        defaultState={{ center: [53.507852, 49.420411], zoom: 9 }}
        state={mapState}
      >
        <GeoObject
          geometry={{
            type: "LineString",
            coordinates: coordinates,
          }}
          options={{
            geodesic: true,
            strokeWidth: 3,
            strokeColor: "#F008",
          }}
        />
        {mark ? <Placemark geometry={mark} /> : ""}
      </Map>
    </YMaps>
  );
};

export default MapComponent;
