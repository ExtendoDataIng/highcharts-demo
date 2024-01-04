import React, { useEffect, useState } from "react"
import "./style.css"
import Dashboard from "./Dashboard"

const data = [
  ["Food", "Vitamin A"],
  ["Beef Liver", 6421],
  ["Lamb Liver", 2122],
  ["Cod Liver Oil", 1350],
  ["Mackerel", 388],
  ["Tuna", 214],
]

const chartOptions = {
  chart: {
    animation: false,
    type: "column",
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "Tester",
  },
  subtitle: {
    text: "Sub-title",
  },
  accessibility: {
    point: {
      descriptionFormat: "Vitamin A content in {name}: {y} micrograms.",
    },
    description: `The first bar chart uses some example data to present
        the ability to edit the connector values by manually changing the height
        of the bars in the series, which is possible with allowConnectorUpdate
        option set to true.`,
  },
  tooltip: {
    stickOnContact: true,
    valueSuffix: " mcg",
  },
  xAxis: {
    title: {
      text: "X Axis Title",
    },
  },
  yAxis: {
    title: {
      text: "Y Axis Title",
    },
    accessibility: {
      description: "amount of Vitamin A in micrograms",
    },
  },
  legend: {
    enabled: true,
  },
  plotOptions: {
    series: {
      colorByPoint: true,
      dragDrop: {
        draggableY: true,
        dragPrecisionY: 1,
      },
    },
  },
}

const configDummy = {
  dataPool: {
    connectors: [
      {
        id: "connector-1",
        type: "JSON",
        options: {
          data,
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
        Food: "x",
        "Vitamin A": "y",
      },
      chartOptions,
    },
  ],
}

export default function App() {
  return <Dashboard config={configDummy} />
}
