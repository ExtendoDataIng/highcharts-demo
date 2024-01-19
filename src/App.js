import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsData from "highcharts/modules/data";
import processDensity from "./processDensity";

// Inicializa los módulos
HighchartsMore(Highcharts);
HighchartsData(Highcharts);

const App = () => {
  const [statsContent, setStatsContent] = useState(""); // Estado para las estadísticas

  useEffect(() => {
    const discipline = [
      "triathlon",
      "badminton",
      "fencing",
      "rowing",
      "handball",
      "cycling",
      "gymnastics",
    ];

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/mekhatria/demo_highcharts/master/densityMaleData.json?callback=?"
        );
        const dataJson = await response.json();

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

        let data = processDensity(step, precision, width, ...dataArray);

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
            zIndex: chartsNbr - i,
            stats: data.stat[i], // Añadir estadísticas a cada serie
          });
        });

        // Configuración del gráfico
        Highcharts.chart("container", {
          chart: {
            type: "areasplinerange",
            animation: true,
          },
          title: {
            text: "The 2012 Olympic male athletes weight",
          },
          xAxis: {
            labels: { format: "{value} kg" },
          },
          yAxis: {
            title: { text: null },
            categories: discipline,
            min: 0,
            max: chartsNbr - 1,
            labels: {
              formatter: function () {
                if (this.pos < chartsNbr) return this.value;
              },
              style: {
                textTransform: "capitalize",
                fontSize: "9px",
              },
            },
            startOnTick: true,
            gridLineWidth: 1,
            tickmarkPlacement: "on",
          },
          tooltip: {
            useHTML: true,
            shared: true,
            crosshairs: true,
            valueDecimals: 3,
            headerFormat: null,
            pointFormat: "<b>{series.name}</b>: {point.x} kg <br/>",
          },
          plotOptions: {
            areasplinerange: {
              marker: {
                enabled: false,
              },
              states: {
                hover: {
                  enabled: false,
                },
              },
              pointStart: xi[0],
            },
          },
          legend: {
            enabled: false,
          },
          series: series,
          // Incluye una tabla debajo del gráfico
          annotations: [{
            labels: [{
              point: {
                xAxis: 0,
                yAxis: chartsNbr,
                x: 0,
                y: 0
              },
              text: "Métricas",
              backgroundColor: 'white',
              align: 'center',
              verticalAlign: 'middle'
            }],
            labelOptions: {
              backgroundColor: 'white'
            }
          }],
        });

        // Mostrar todas las métricas en una tabla
        const allStatsContent = (
          <table>
            <thead>
              <tr>
                <th>Métricas</th>
                {discipline.map((discipline) => (
                  <th key={discipline}>{discipline}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Min</b></td>
                {data.stat.map((stats) => (
                  <td key={stats[0]}>{Highcharts.numberFormat(stats[0], 2)} kg</td>
                ))}
              </tr>
              <tr>
                <td><b>Q1</b></td>
                {data.stat.map((stats) => (
                  <td key={stats[1]}>{Highcharts.numberFormat(stats[1], 2)} kg</td>
                ))}
              </tr>
              <tr>
                <td><b>Median</b></td>
                {data.stat.map((stats) => (
                  <td key={stats[2]}>{Highcharts.numberFormat(stats[2], 3)} kg</td>
                ))}
              </tr>
              <tr>
                <td><b>Q3</b></td>
                {data.stat.map((stats) => (
                  <td key={stats[3]}>{Highcharts.numberFormat(stats[3], 2)} kg</td>
                ))}
              </tr>
              <tr>
                <td><b>Max</b></td>
                {data.stat.map((stats) => (
                  <td key={stats[4]}>{Highcharts.numberFormat(stats[4], 2)} kg</td>
                ))}
              </tr>
              <tr>
                <td><b>Geomean</b></td>
                {data.stat.map((stats) => (
                  <td key={stats[5]}>{Highcharts.numberFormat(stats[5], 2)} kg</td>
                ))}
              </tr>
            </tbody>
          </table>
        );

        setStatsContent(allStatsContent);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="container" />
      <div>{statsContent}</div>
    </div>
  );
};

export default App;
