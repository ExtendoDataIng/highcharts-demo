import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

const EuropeMap = () => {
  const [topology, setTopology] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topologyResponse = await fetch('https://code.highcharts.com/mapdata/custom/europe.topo.json');
        if (!topologyResponse.ok) throw new Error('Failed to fetch topology data');
        const topologyData = await topologyResponse.json();
        setTopology(topologyData);

        const dataResponse = await fetch('https://www.highcharts.com/samples/data/european-train-stations-near-airports.json');
        if (!dataResponse.ok) throw new Error('Failed to fetch data');
        const dataJson = await dataResponse.json();
        setData(dataJson);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!topology || !data) {
    return <div>Loading...</div>;
  }

  const options = {
    chart: {
      map: topology,
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
        accessibility: {
          exposeAsGroupOnly: true,
        },
        borderColor: '#A0A0A0',
        nullColor: 'rgba(177, 244, 177, 0.5)',
        showInLegend: false,
      },
      {
        type: 'mappoint',
        enableMouseTracking: true,
        accessibility: {
          point: {
            descriptionFormat:
              '{#if isCluster}Grouping of {clusterPointsAmount} points.{else}{name}, country code: {country}.{#endif}',
          },
        },
        colorKey: 'clusterPointsAmount',
        name: 'Cities',
        data: data,
        color: Highcharts.getOptions().colors[5],
        marker: {
          lineWidth: 1,
          lineColor: '#fff',
          symbol: 'mapmarker',
          radius: 8,
        },
        dataLabels: {
          verticalAlign: 'top',
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={options}
      />
    </div>
  );
};

export default EuropeMap;
