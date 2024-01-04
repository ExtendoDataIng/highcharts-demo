import React, { useEffect, useState } from "react"
import "./style.css"
import Dashboard from "./Dashboard"

const data = [
  ["Food", "Vitamin A", "Vitamin B"],
  ["Beef Liver", 6421, 6533],
  ["Lamb Liver", 2122, 2854],
  ["Cod Liver Oil", 1350, 1034],
  ["Mackerel", 388, 210],
  ["Tuna", 214, 180],
]

const configDummy = {
  dataPool: {
    connectors: [
      {
        id: "connector-1",
        type: "JSON",
        options: {
          data, // Should be empty array and handle it in Server...
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
        "Vitamin B": "y",
      },
      chartOptions: {
        chart: {
          animation: false,
          type: "column",
        },
        title: {
          text: "Tester",
        },
        subtitle: {
          text: "Sub-title",
        },
        tooltip: {
          stickOnContact: true,
          valueSuffix: " mcg",
        },
        xAxis: {
          title: {
            text: "X Axis Title",
          },
          categories: ["Beef", "Lamb", "Cod", "Mackerel", "Tuna"],
        },
        yAxis: {
          title: {
            text: "Y Axis Title",
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
      },
    },
  ],
}

export default function App() {
  return <Dashboard config={configDummy} />
}
