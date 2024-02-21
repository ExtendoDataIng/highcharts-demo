import React from "react";
import "./style.css";
import Dashboard from "./Dashboard";

export default function App() {

  const configDynamic = {
    dataPool: {
      connectors: [
        {
          id: "connector-1",
          type: "JSON",
        },
      ],
    },
    gui: {
      layouts: [
        {
          id: "layout-1",
          rows: [
            {
              cells: [
                {
                  id: "dashboard-col-1",
                },
              ],
            },
          ],
        },
      ],
    },
    components: [
      {
        cell: "dashboard-col-1",
        type: "Highcharts",
        connector: {
          id: "connector-1",
        },
        chartOptions: {
          chart: {
            type: "column",
          },
          title: {
            text: "Column chart with negative values",
          },
          xAxis: {
            categories: ["Apples", "Oranges", "Pears"]
          },
          yAxis: {
            plotLines: [
              {
                value: 0,
                color: "black",
                width: 100,
              },
            ],
          },
          credits: {
            enabled: false,
          },
          plotOptions: {
            column: {
              borderRadius: "25%",
              pointWidth: 50, // Ajusta este valor según tus necesidades
            },
          },
          series: [
            {
              name: "Joe",
              data: [-3, 5, 2],
            },
          ],
        },
      },
    ],
  };

  return (
    <div>
      <Dashboard config={configDynamic} />
    </div>
  );
}