import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import AnalysisResult from "./AnalysisResult";

interface Iprops {
  chartData: any;
}

export default function Chart101({ chartData }: Iprops) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    setData(chartData);
  }, []);

  return (
    <>
      <div className="flex justify-center flex-nowrap text-12">
        {data
          ? data.data.result.map((item: any) => {
            console.log(item);
            return (
              <>
                <BarChart
                  width={120}
                  height={300}
                  data={[item]}
                  margin={{
                    top: 40,
                    right: 30,
                    left: 0,
                    bottom: 40,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickMargin={16} interval={1} />
                  <YAxis />
                  <Tooltip wrapperStyle={{ zIndex: "50" }} />
                  {/* <Legend /> */}
                  <Bar
                    dataKey={data.data.corp_name}
                    fill={
                      item["평가"] === "양호" ? "#8884d8" : ("불량" ? "red" : "orange")
                    }
                  />
                  <Bar dataKey="산업평균" fill="#82ca9d" />
                </BarChart>
              </>
            );
          })
          : "데이터가 없어요 ㅠㅠ"}
      </div>
    </>
  );
}
