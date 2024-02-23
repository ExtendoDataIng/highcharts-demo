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
        sync: null,
        chartOptions: {
          chart: {
            animation: true,
            type: "column",
          },
          title: {
            text: "Bar chart z-score comparison",
          },
          xAxis: {
            categories: ["Aetna Choice POS", "BCBS NC Blue HPN Atrium"],
          },
          yAxis: {
            plotLines: [
              {
                value: 0,
                color: 'green', // Puedes dejar esta configuración aquí también para asegurarte
                width: 20,
                zIndex: 1,
                dashStyle: 'Solid',
              },
            ],
          },
          credits: {
            enabled: false,
          },
          plotOptions: {
            column: {
              borderRadius: "25%",
              pointWidth: 50,
            },
          },
          series: [
            {
              name: "HCPCS J2357",
              data: [0.41, -0.66],
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
