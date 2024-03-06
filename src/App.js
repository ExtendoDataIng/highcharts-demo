import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import mapData from './topo.json';
import countyUnemploymentData from './demo-geodata-nc-counties.json';

const MapChart = () => {
  const [mapOption, setMapOption] = useState('US_map');
  const [metricOption, setMetricOption] = useState('mean');

  useEffect(() => {
    const processData = () => {
      let filteredMapData;

      if (mapOption === 'US_map') {
        filteredMapData = {
          ...mapData,
          objects: {
            ...mapData.objects,
            default: {
              ...mapData.objects.default,
              geometries: mapData.objects.default.geometries.map((g) => g),
            },
          },
        };
      } else {
        filteredMapData = {
          ...mapData,
          objects: {
            ...mapData.objects,
            default: {
              ...mapData.objects.default,
              geometries: mapData.objects.default.geometries.filter(
                (g) => g.properties['hc-key'] && g.properties['hc-key'].includes('-') &&
                         g.properties['hc-key'].split('-')[1].toUpperCase() === mapOption
              ),
            },
          },
        };
      }

      if (Array.isArray(filteredMapData.objects.default.geometries)) {
        filteredMapData.objects.default.geometries.forEach((g) => {
          const properties = g.properties;
          if (properties['hc-key']) {
            const stateAbbr = properties['hc-key'].substr(3, 2).toUpperCase();

            if (!properties.name.includes(stateAbbr)) {
              properties.name += `, ${stateAbbr}`;
            }
          }
        });
      }

      const filteredData = countyUnemploymentData.filter((data) => {
        const upperCaseCode = data.geo_key.toUpperCase();

        if (mapOption === 'US_map') {
          const stateCodesToInclude = ['TX', 'NC'];
          return stateCodesToInclude.some((geo_key) => upperCaseCode.includes(`-${geo_key}-`));
        } else {
          return upperCaseCode.includes(`-${mapOption}-`);
        }
      });

      // const filteredData = countyUnemploymentData.filter((data) => {
      //   const upperCaseCode = data.geo_name.toUpperCase();

      //   if (mapOption === 'US_map') {
      //     const stateCodesToInclude = ['TX', 'NC'];
      //     return stateCodesToInclude.some((geo_name) => upperCaseCode.includes(`${geo_name}`));
      //   } else {
      //     return upperCaseCode.includes(`${mapOption}`);
      //   }
      // });

      const values = filteredData.map((item) => item[metricOption]);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      const metricNames = {
        mean: 'Mean',
        min: 'Min',
        max: 'Max',
      };

      Highcharts.mapChart('container', {
        chart: {
          map: filteredMapData,
          height: '30%',
        },
        title: {
        text: `${metricNames[metricOption]} - ${mapOption}`, // Usar el nombre descriptivo
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
          min: minValue,
          max: maxValue,
          tickInterval: Math.ceil((maxValue - minValue) / 10), // Ajusta el intervalo según tu preferencia
          stops: [
            [0, '#F1EEF6'],
            [0.65, '#900037'],
            [1, '#500007'],
          ],
          labels: {
            format: '{value}',
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
            data: filteredData.map((item) => ({
              ...item,
              value: item[metricOption],
            })),
            joinBy: ['hc-key','geo_key'],
            name: metricOption,
            tooltip: {
              pointFormat: '<b>{point.name}</b><br/>- Mean: {point.mean}<br/>- Max: {point.max}<br/>- Min: {point.min}'
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
  }, [mapOption, metricOption]);

  const handleMapOptionChange = (event) => {
    setMapOption(event.target.value);
  };

  const handleMetricOptionChange = (event) => {
    setMetricOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="mapOption">Select Map:</label>
      <select id="mapOption" value={mapOption} onChange={handleMapOptionChange}>
        <option value="US_map">US Map</option>
        <option value="TX">Texas</option>
        <option value="NC">North Carolina</option>
      </select>

      <label htmlFor="metricOption">Select Metric:</label>
      <select id="metricOption" value={metricOption} onChange={handleMetricOptionChange}>
        <option value="mean">Mean</option>
        <option value="min">Min</option>
        <option value="max">Max</option>
      </select>

      <div id="container" />
    </div>
  );
};

export default MapChart;

