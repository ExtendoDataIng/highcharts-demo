import React from 'react';
import Highcharts from 'highcharts/highmaps';
import HC_map from 'highcharts/modules/map';
import HC_coloraxis from 'highcharts/modules/coloraxis';
import HC_accessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import ncTopo from './filtered-topo-nc.json';
import airportsData from './nc_airports.json';
import HC_markerClusters from 'highcharts/modules/marker-clusters';

// Importar los módulos necesarios
HC_map(Highcharts);
HC_markerClusters(Highcharts);
HC_coloraxis(Highcharts);
HC_accessibility(Highcharts);

const NcMap = () => {
  const options = {
    chart: {
      map: ncTopo,
    },
    title: {
      text: 'North Carolina Counties with Airports',
      align: 'left',
    },
    subtitle: {
      text: 'Source: Airports data',
      align: 'left',
    },
    mapNavigation: {
      enabled: true,
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br>Lat: {point.lat:.2f}, Lon: {point.lon:.2f}',
    },
    colorAxis: {
      min: 0,
      max: 20,
    },
    series: [
      {
        type: 'map',
        name: 'North Carolina',
        borderColor: '#A0A0A0',
        nullColor: 'rgba(177, 244, 177, 0.5)',
        showInLegend: false,
        data: ncTopo.objects.default.geometries.map((geo, index) => ({
          key: geo.properties['hc-key'],
          value: index // Puedes usar algún valor relevante en lugar del índice
        })),
        joinBy: 'key',
        states: {
          hover: {
            color: '#EEDD66',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
      {
        type: 'mappoint',
        name: 'Airports',
        data: airportsData.map(airport => ({
          name: airport.nombre,
          lat: airport.latitud,
          lon: airport.longitud,
          country: airport.country,
        })),
        colorKey: 'clusterPointsAmount',
        color: Highcharts.getOptions().colors[5],
        marker: {
          symbol: 'mapmarker',
          radius: 8,
          lineWidth: 1,
          lineColor: '#ffffff',
        },
        cluster: {
          enabled: true,
          allowOverlap: false,
          animation: {
            duration: 450,
          },
          layoutAlgorithm: {
            type: 'grid',
            gridSize: 70,
          },
          zones: [
            { from: 1, to: 4, marker: { radius: 13 } },
            { from: 5, to: 9, marker: { radius: 15 } },
            { from: 10, to: 15, marker: { radius: 17 } },
            { from: 16, to: 20, marker: { radius: 19 } },
            { from: 21, to: 100, marker: { radius: 21 } },
          ],
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          verticalAlign: 'top',
          style: {
            fontSize: '10px',
          },
        },
        accessibility: {
          point: {
            descriptionFormatter: function (point) {
              if (point.isCluster) {
                return `Grouping of ${point.clusterPointsAmount} points.`;
              } else {
                return `${point.name}, country code: ${point.country}.`;
              }
            },
          },
        },
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'mapChart'}
      options={options}
    />
  );
};

export default NcMap;
