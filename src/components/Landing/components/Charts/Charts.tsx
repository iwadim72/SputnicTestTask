import { FC, useEffect, useState } from "react";
import "./Charts.scss";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CheckBox from "./components/CheckBox/CheckBox.tsx";
import { CategoricalChartState } from "recharts/types/chart/types";

interface IChartsProps {
  data: [
    {
      string: number | string;
      reserve: {
        any: string | number;
      };
    },
  ];
  setMark: (arg: number[]) => void;
}

const Charts: FC<IChartsProps> = ({ data, setMark }) => {
  const [activeCharts, setActiveCharts] = useState("alt");
  const [userWidth, setUserWidth] = useState<number>(window.innerWidth);

  /// Обработка клика по точкам графика
  const handleClickChart = (data: CategoricalChartState) => {
    if (data.activePayload) {
      const coords = [
        data.activePayload[0].payload.lat,
        data.activePayload[0].payload.lng,
      ];

      setMark(coords);
    }
  };

  useEffect(() => {
    /// Обновляю ширину окна пользователя для придания гибкости графику.
    const handleResize = () => {
      setTimeout(() => {
        const userWidthActual = window.innerWidth;
        if (userWidth !== userWidthActual) {
          console.log("Изменили ширину");
          setUserWidth(userWidthActual);
        }
      }, 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="charts">
      <ul className="charts__list">
        {data
          ? Object.keys(data[0].reserve).map((item, i) => {
              return (
                <CheckBox
                  key={i}
                  name={item}
                  activeCharts={activeCharts}
                  setActiveCharts={setActiveCharts}
                />
              );
            })
          : ""}
      </ul>
      <AreaChart
        className={"charts__chart"}
        width={userWidth - 20}
        height={600}
        data={data}
        onClick={(data) => {
          handleClickChart(data);
        }}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="datetime"
          /// Пробелы требуются для корректного отображения
          tickFormatter={(value) => {
            return `        ${value.slice(8, 10)}.${value.slice(5, 7)}.${value.slice(0, 4)}      `;
          }}
        />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={`reserve.${activeCharts}`}
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </div>
  );
};

export default Charts;
