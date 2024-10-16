import React, { useEffect } from "react"
import Dashboards from "@highcharts/dashboards/es-modules/masters/dashboards.src.js"
import DataGrid from "@highcharts/dashboards/es-modules/DataGrid/DataGrid"
import Highcharts from "highcharts/es-modules/masters/highcharts.src.js"
import HighchartsPlugin from "@highcharts/dashboards/es-modules/Dashboards/Plugins/HighchartsPlugin"
import DataGridPlugin from "@highcharts/dashboards/es-modules/Dashboards/Plugins/DataGridPlugin"

HighchartsPlugin.custom.connectHighcharts(Highcharts)
Dashboards.PluginHandler.addPlugin(HighchartsPlugin)

DataGridPlugin.custom.connectDataGrid(DataGrid)
Dashboards.PluginHandler.addPlugin(DataGridPlugin)

Highcharts.setOptions({
  chart: {
      type: 'area',
      spacingTop: 20,
      spacingBottom: 20
  },
  title: {
      align: 'left',
      margin: 0,
      x: 30
  },
  credits: {
      enabled: false
  },
  legend: {
      enabled: false
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
      positioner: function () {
          return {
              // right aligned
              x: this.chart.chartWidth - this.label.width,
              y: 10 // align to title
          };
      },
      borderWidth: 0,
      backgroundColor: 'none',
      pointFormat: '{point.y}',
      headerFormat: '',
      shadow: false,
      valueDecimals: 0
  }
});

export default function Dashboard(props) {
  const { config } = props

  useEffect(() => {
    Dashboards.board("container", config, true)
  }, [config])

  return <div id="container" className="highcharts-light" />
}
