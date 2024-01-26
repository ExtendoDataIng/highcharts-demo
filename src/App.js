import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

// Import the local JSON files
import mapData from './path-to-your-local-map-data.json';
import countyUnemploymentData from './path-to-your-local-county-unemployment-data.json';

const MapChart = () => {
  useEffect(() => {
    const processData = () => {
      mapData.objects.default.geometries.forEach((g) => {
        const properties = g.properties;
        if (properties['hc-key']) {
          properties.name =
            properties.name +
            ', ' +
            properties['hc-key'].substr(3, 2).toUpperCase();
        }
      });

      document.getElementById('container').innerHTML = 'Rendering map...';

      setTimeout(function () {
        Highcharts.mapChart('container', {
          chart: {
            map: mapData,
            height: '80%',
          },
          title: {
            text: 'US Counties unemployment rates, January 2018',
            align: 'left',
          },
          accessibility: {
            description: 'Demo showing a large dataset.',
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            margin: 0,
            backgroundColor:
              (Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.backgroundColor) ||
              'rgba(255, 255, 255, 0.85)',
          },
          mapNavigation: {
            enabled: true,
          },
          colorAxis: {
            min: 0,
            max: 25,
            tickInterval: 5,
            stops: [
              [0, '#F1EEF6'],
              [0.65, '#900037'],
              [1, '#500007'],
            ],
            labels: {
              format: '{value}%',
            },
          },
          plotOptions: {
            mapline: {
              showInLegend: false,
              enableMouseTracking: false,
            },
          },
          series: [
            {
              data: countyUnemploymentData,
              joinBy: ['hc-key', 'code'],
              name: 'Unemployment rate',
              tooltip: {
                valueSuffix: '%',
              },
              borderWidth: 0.5,
              shadow: false,
              accessibility: {
                enabled: false,
              },
            },
            {
              type: 'mapline',
              name: 'State borders',
              color: 'white',
              shadow: false,
              borderWidth: 2,
              accessibility: {
                enabled: false,
              },
            },
          ],
        });
      }, 0);
    };

    processData();
  }, []);

  return <div id="container" />;
};

export default MapChart;
