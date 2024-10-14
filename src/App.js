import * as React from "react";
import "./style.css";
import Dashboard from "./Dashboard";
import data from "./data.json";

const config = {
  dataPool: {
    connectors: [
      {
        id: "activity-data-0",
        type: "JSON",
        options: {
          firstRowAsNames: false,
          orientation: 'columns',
          columnNames: ['Speed'],
          data: [
              data.datasets[0].data,
          ],
        },
      },
      {
        id: "activity-data-1",
        type: "JSON",
        options: {
          firstRowAsNames: false,
          orientation: 'columns',
          columnNames: ['Elevation'], // Ajusta los nombres de las columnas según el gráfico
          data: [
            data.datasets[1].data, // Datos para el segundo gráfico
          ],
        },
      },
      {
        id: "activity-data-2",
        type: "JSON",
        options: {
          firstRowAsNames: false,
          orientation: 'columns',
          columnNames: ['Heart rate'], // Ajusta los nombres de las columnas según el gráfico
          data: [
            data.datasets[2].data, // Datos para el tercer gráfico
          ],
        },
      },
    ],
  },
  gui: {
    layouts: [
      {
        rows: [
          {
            cells: [
              {
                id: "dashboard-cell-0",
                responsive: {
                  small: {
                    width: "100%",
                  },
                  medium: {
                    width: "100%",
                  },
                  large: {
                    width: "100%",
                  },
                },
                height: 210, // Adjust height as needed
              },
            ],
          },
          {
            cells: [
              {
                id: "dashboard-cell-1",
                responsive: {
                  small: {
                    width: "100%",
                  },
                  medium: {
                    width: "100%",
                  },
                  large: {
                    width: "100%",
                  },
                },
                height: 210, // Adjust height as needed
              },
            ],
          },
          {
            cells: [
              {
                id: "dashboard-cell-2",
                responsive: {
                  small: {
                    width: "100%",
                  },
                  medium: {
                    width: "100%",
                  },
                  large: {
                    width: "100%",
                  },
                },
                height: 210, // Adjust height as needed
              },
            ],
          },
        ],
      },
    ],
  },
  components: [
    {
      connector: {
        id: "activity-data-0",
      },
      cell: "dashboard-cell-0",
      type: "Highcharts",
      chartOptions: {
        title: {
          text: "Speed", // Chart title
        },
        xAxis: {
            crosshair: true,
            labels: {
                format: '{value} km'
            },
            accessibility: {
                description: 'Kilometers',
                rangeDescription: '0km to 6.5km'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            valueSuffix: ' km/h',
            shared: true, // Use shared tooltips
            formatter: function () {
              // Custom tooltip logic to display values from other graphs
              const elevation = data.datasets[1].data[this.point.index]; // Get corresponding elevation
              const heartRate = data.datasets[2].data[this.point.index]; // Get corresponding heart rate
  
              return `
                Speed: ${this.y} km/h<br>
                Elevation: ${elevation} m<br>
                Heart Rate: ${heartRate} bpm
              `;
            },
          },
        series: [
          {
            type: "line", // Line chart for speed
            id: "Speed",
            name: "Speed",
            data: data.datasets[0].data.map((value, index) => [data.xData[index], value]),
          },
        ],
        sync: {
          highlight: true, // Sync highlights if you use multiple charts later
        },
      },
    },
    {
      connector: {
        id: "activity-data-1",
      },
      cell: "dashboard-cell-1",
      type: "Highcharts",
      chartOptions: {
        title: {
          text: "Elevation", // Chart title
        },
        xAxis: {
            crosshair: true,
            labels: {
                format: '{value} km'
            },
            accessibility: {
                description: 'Kilometers',
                rangeDescription: '0km to 6.5km'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            valueSuffix: ' m',
            shared: true, // Use shared tooltips
            formatter: function () {
              const speed = data.datasets[0].data[this.point.index]; // Get corresponding speed
              const heartRate = data.datasets[2].data[this.point.index]; // Get corresponding heart rate
  
              return `
                Elevation: ${this.y} m<br>
                Speed: ${speed} km/h<br>
                Heart Rate: ${heartRate} bpm
              `;
            },
          },
        series: [
          {
            type: "line",
            id: "Elevation",
            name: "Elevation",
            data: data.datasets[1].data.map((value, index) => [data.xData[index], value]),
          },
        ],
        sync: {
          highlight: true, // Sync highlights if you use multiple charts later
        },
      },
    },
    {
        connector: {
          id: "activity-data-2",
        },
        cell: "dashboard-cell-2",
        type: "Highcharts",
        chartOptions: {
          title: {
            text: "Heart rate", // Chart title
          },
          xAxis: {
            crosshair: true,
            labels: {
                format: '{value} km'
            },
            accessibility: {
                description: 'Kilometers',
                rangeDescription: '0km to 6.5km'
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            valueSuffix: ' bpm',
            shared: true, // Use shared tooltips
            formatter: function () {
              const speed = data.datasets[0].data[this.point.index]; // Get corresponding speed
              const elevation = data.datasets[1].data[this.point.index]; // Get corresponding elevation
  
              return `
                Heart Rate: ${this.y} bpm<br>
                Speed: ${speed} km/h<br>
                Elevation: ${elevation} m
              `;
            },
          },
          series: [
            {
              type: "line",
              id: "Heart rate",
              name: "Heart rate",
              data: data.datasets[2].data.map((value, index) => [data.xData[index], value]),
            },
          ],
          sync: {
            highlight: true, // Sync highlights if you use multiple charts later
          },
        },
      },
  ],
};

export default function App() {
  return <Dashboard config={config} />;
}