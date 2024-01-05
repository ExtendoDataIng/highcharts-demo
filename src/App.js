import React, { useState } from "react";
import "./style.css";
import Dashboard from "./Dashboard";

const data = [
  ["carrier_plan_name", "MS-DRG 247", "MS-DRG 794", "CPT 43239", "CPT 99214", "CPT 99291", "HCPCS J2357", "HCPCS J3241", "HCPCS J7686"],
  ["Aetna Choice POS", 0, 9067.02, 809.75, 102.4, 284.67, 9.16, 103.53, 712.7],
  ["BCBS NC Preferred Provider Network", 21910.04, 7270.24, 590.16, 1, 0, 43.08, 491.07, 1069.18],
  ["Medcost Preferred", 0, 0, 0, 669.95, 0, 0, 0, 0],
  ["UHC Choice POS Plus", 0, 0, 1948.92, 0, 0, 0, 0, 0],
];

const data_2 = [
  ["carrier_plan_name", "MS-DRG 247", "MS-DRG 794", "CPT 43239", "CPT 99214", "CPT 99291", "HCPCS J2357", "HCPCS J3241", "HCPCS J7686"],
  ["Aetna Choice POS", 0, 9067.02, 809.75, 102.4, 284.67, 9.16, 103.53, 712.7],
  ["BCBS NC Preferred Provider Network", 0, 9067.02, 809.75, 102.4, 284.67, 9.16, 103.53, 712.7],
  ["Medcost Preferred", 0, 9067.02, 809.75, 102.4, 284.67, 9.16, 103.53, 712.7],
  ["UHC Choice POS Plus", 0, 9067.02, 809.75, 102.4, 284.67, 9.16, 103.53, 712.7],
];

const data_3 = [
  ["carrier_plan_name", "MS-DRG 247", "MS-DRG 794", "CPT 43239", "CPT 99214", "CPT 99291", "HCPCS J2357", "HCPCS J3241", "HCPCS J7686"],
  ["Aetna Choice POS", 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02],
  ["BCBS NC Preferred Provider Network", 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02],
  ["Medcost Preferred", 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02],
  ["UHC Choice POS Plus", 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02, 9067.02],
];

const data_4 = [
  ["carrier_plan_name", "MS-DRG 247", "MS-DRG 794", "CPT 43239", "CPT 99214", "CPT 99291", "HCPCS J2357", "HCPCS J3241", "HCPCS J7686"],
  ["Aetna Choice POS", 0, 7270.24, 0, 7270.24, 0, 7270.24, 0, 7270.24],
  ["BCBS NC Preferred Provider Network", 0, 7270.24, 0, 7270.24, 0, 7270.24, 0, 7270.24],
  ["Medcost Preferred", 0, 7270.24, 0, 7270.24, 0, 7270.24, 0, 7270.24],
  ["UHC Choice POS Plus", 0, 7270.24, 0, 7270.24, 0, 7270.24, 0, 7270.24],
];

export default function App() {
  const [currentData, setCurrentData] = useState(data);
  const [subtitle, setSubtitle] = useState("avg_rate");

  const handleButtonClick = (newSubtitle, newData) => {
    setCurrentData(newData);
    setSubtitle(newSubtitle);
  };

  const configDynamic = {
    dataPool: {
      connectors: [
        {
          id: "connector-1",
          type: "JSON",
          options: {
            data: currentData,
          },
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
        sync: {
          extremes: true,
          highlight: true,
        },
        columnAssignment: {
          "MS-DRG 247": "y",
          "MS-DRG 794": "y",
          "CPT 43239": "y",
          "CPT 99214": "y",
          "CPT 99291": "y",
          "HCPCS J2357": "y",
          "HCPCS J3241": "y",
          "HCPCS J7686": "y",
        },
        chartOptions: {
          chart: {
            animation: false,
            type: "column",
          },
          title: {
            text: "Visualization Test Data",
          },
          subtitle: {
            text: subtitle,
          },
          tooltip: {
            stickOnContact: true,
          },
          xAxis: {
            title: {
              text: "carrier_plan_name",
            },
            categories: currentData.map(entry => entry[0]).slice(1),
          },
          yAxis: {
            title: {
              text: `${subtitle} by billing_code_type_label`,
            },
          },
          legend: {
            enabled: true,
          },
          plotOptions: {
            series: {
              colorByPoint: false,
              dragDrop: {
                draggableY: true,
                dragPrecisionY: 1,
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div>
      <button onClick={() => handleButtonClick("avg_rate", data)}>avg_rate</button>
      <button onClick={() => handleButtonClick("moda_rate", data_2)}>moda_rate</button>
      <button onClick={() => handleButtonClick("a_rate", data_3)}>a_rate</button>
      <button onClick={() => handleButtonClick("b_rate", data_4)}>b_rate</button>
      <Dashboard config={configDynamic} />
    </div>
  );
}