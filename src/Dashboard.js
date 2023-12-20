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

export default function Dashboard(props) {
  const { config } = props

  useEffect(() => {
    Dashboards.board("container", config, true)
  }, [config])

  return <div id="container" className="highcharts-light" />
}
