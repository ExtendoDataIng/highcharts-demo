import React, { useEffect, useState } from "react"
import axios from "axios"
import "./style.css"

import Dashboard from "./Dashboard"

import Highcharts from "highcharts"
import HighchartsMore from "highcharts/highcharts-more"
import HighchartsData from "highcharts/modules/data"

// Inicializa los módulos
HighchartsMore(Highcharts)
HighchartsData(Highcharts)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [series, setSeries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postBody = {
          billing_code_category: "Medical Category 1",
          region: "NC",
          billing_code_class: "billing-code-categories",
          billing_code_class_value: "Medical Category 1",
          billing_code_ip_op: "IP",
          billing_class: "Institutional",
          negotiation_arrangement: "Fee-for-service",
          negotiated_type: "Percentage",
          medicare_rate: "Include",
          segment: "carrier",
          visualization: "density",
        }
        const response = await axios.post(
          "http://localhost:7000/api/dashboard/commercial-insurance-negotiated-rates",
          postBody
        )
        setSeries(response.data.series)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  function HandleDashboard() {
    const gui = {
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
    }
    const components = [
      {
        cell: "dashboard-col-1",
        type: "Highcharts",
        chartOptions: {
          chart: {
            type: "areasplinerange",
          },
          series: [
            {
              data: [1, 2, 3, 4],
            },
          ],
        },
      },
    ]

    const config = {
      gui,
      components,
    }

    return <Dashboard config={config} />
  }

  return (
    <div>
      Hello!
      <HandleDashboard />
    </div>
  )
}
