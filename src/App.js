import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsData from "highcharts/modules/data";
import processDensity from "./processDensity"; // Ajusta la ruta según la ubicación de tu archivo processDensity.js
//

// Inicializa los módulos
HighchartsMore(Highcharts);
HighchartsData(Highcharts);

const App = () => {
  useEffect(() => {
    const discipline = [
      "triathlon",
      "badminton",
      "fencing",
      "rowing",
      "handball",
      "cycling",
      "gymnastics"
    ];

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/mekhatria/demo_highcharts/master/densityMaleData.json?callback=?"
        );
        const dataJson = await response.json();

        let redrawing = false;
        let dataArray = discipline.map(() => []);

        dataJson.forEach((e) => {
          discipline.forEach((key, value) => {
            if (e.sport === key) {
              dataArray[value].push(e.weight);
            }
          });
        });

        let step = 1,
          precision = 0.00000000001,
          width = 15;

        let data = processDensity(
          step,
          precision,
          width,
          ...dataArray
        );

        let chartsNbr = data.results.length;
        let xi = data.xiData;

        let dataSeries = [],
          series = [];
        data.results.forEach((e, i) => {
          dataSeries.push([]);
          dataSeries[i] = e;
          series.push({
            data: dataSeries[i],
            name: discipline[i],
            zIndex: chartsNbr - i
          });
        });

        console.log(dataSeries)
        // console.log(series)

        Highcharts.chart("container", {
          chart: {
            type: "areasplinerange",
            animation: true,
            events: {
              render() {
                if (!redrawing) {
                  redrawing = true;

                  this.series.forEach((s) => {
                    s.update({
                      fillColor: {
                        linearGradient: [0, 0, this.plotWidth, 0],
                        stops: [
                          [0, Highcharts.color("yellow").setOpacity(0).get("rgba")],
                          [0.25, "#FFA500"], //orange
                          [0.5, "#FF0033"], //red
                          [0.75, "#7A378B"] //purple
                        ]
                      }
                    });
                  });
                  redrawing = false;
                }
              }
            }
          },
          title: {
            text: "The 2012 Olympic male athletes weight"
          },
          xAxis: {
            labels: { format: "{value} kg" }
          },
          yAxis: {
            title: { text: null },
            categories: discipline,
            max: chartsNbr,
            labels: {
              formatter: function () {
                if (this.pos < chartsNbr) return this.value;
              },
              style: {
                textTransform: "capitalize",
                fontSize: "9px"
              }
            },
            startOnTick: true,
            gridLineWidth: 1,
            tickmarkPlacement: "on"
          },
          tooltip: {
            useHTML: true,
            shared: true,
            crosshairs: true,
            valueDecimals: 3,
            headerFormat: null,
            pointFormat: "<b>{series.name}</b>: {point.x} kg <br/>",
            footerFormat: null
          },
          plotOptions: {
            areasplinerange: {
              marker: {
                enabled: false
              },
              states: {
                hover: {
                  enabled: false
                }
              },
              pointStart: xi[0],
              animation: {
                duration: 0
              },
              fillColor: "",
              lineWidth: 1,
              color: "black"
            }
          },
          legend: {
            enabled: false
          },
          series: series
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div id="container" />;
};

export default App;
