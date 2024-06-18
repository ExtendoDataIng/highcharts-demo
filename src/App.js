import React from 'react';
import Highcharts from 'highcharts/highmaps';
import HC_map from 'highcharts/modules/map';
import HC_coloraxis from 'highcharts/modules/coloraxis';
import HC_accessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import europeTopo from './europe_topo.json';
import airportsData from './airports.json';
import HC_markerClusters from 'highcharts/modules/marker-clusters';

// Importar los módulos necesarios
HC_map(Highcharts);
HC_markerClusters(Highcharts);
HC_coloraxis(Highcharts);
HC_accessibility(Highcharts);

const EuropeMap = () => {
  const options = {
    chart: {
      map: europeTopo,
    },
    title: {
      text: 'European Train Stations Near Airports',
      align: 'left',
    },
    subtitle: {
      text: 'Source: <a href="https://github.com/trainline-eu/stations">github.com/trainline-eu/stations</a>',
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
    plotOptions: {
      mappoint: {
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
      },
    },
    series: [
      {
        name: 'Europe',
        borderColor: '#A0A0A0',
        nullColor: 'rgba(177, 244, 177, 0.5)',
        showInLegend: false,
      },
      {
        type: 'mappoint',
        name: 'Cities',
        data: airportsData,
        colorKey: 'clusterPointsAmount',
        color: Highcharts.getOptions().colors[5],
        marker: {
          symbol: 'mapmarker',
          radius: 8,
          lineWidth: 1,
          lineColor: '#ffffff',
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

export default EuropeMap;

