import { FC, useEffect, useState } from "react";
import MapComponent from "./components/Map/Map.tsx";
import Charts from "./components/Charts/Charts.tsx";
import { api } from "../../boot/axios.ts";

const Landing: FC = () => {
  const [mark, setMark] = useState<number[]>([]);
  const [coords, setCoords] = useState<number[][]>();
  const [data, setData] = useState();

  /// Прокручивание к карте при изменении/добавлении метки
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [mark]);

  /// Получаем данные
  useEffect(() => {
    api
      .post("getRoutesPoint", {
        id: 740,
        date_start: "2025-02-05 06:13:02",
        date_end: "2025-02-07 17:53:24",
      })
      .then((res) => {
        try {
          setCoords(
            res.data["740"][0].route.map(
              (route: { lat: number; lng: number }) => {
                return [route.lat, route.lng];
              },
            ),
          );

          setData(res.data["740"][0].route);
        } catch {
          console.warn("Проблема с получением данных");
        }
      });
  }, []);
  return (
    <>
      {data ? (
        <>
          <MapComponent coordinates={coords} mark={mark} />
          <Charts data={data} setMark={setMark} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Landing;
