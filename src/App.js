import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highmaps'; // Importar solo el módulo necesario
import mapData from './topo.json';
import countyUnemploymentData from './data.json';

const MapChart = () => {
  useEffect(() => {
    const processData = () => {
      if (Array.isArray(mapData.objects.default.geometries)) {
        mapData.objects.default.geometries.forEach((g) => {
          const properties = g.properties;
          if (properties['hc-key']) {
            const stateAbbr = properties['hc-key'].substr(3, 2).toUpperCase();
    
            // Verificar si el nombre ya incluye la abreviatura del estado
            if (!properties.name.includes(stateAbbr)) {
              properties.name += `, ${stateAbbr}`;
            }
          }
        });
      }

      Highcharts.mapChart('container', {
        chart: {
          map: mapData,
          height: '30%',
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
    };

    document.getElementById('container').innerHTML = 'Rendering map...';
    processData();
  }, []);

  return <div id="container" />;
};

export default MapChart;
