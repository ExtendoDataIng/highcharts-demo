Highcharts.setOptions({
  colors: [
    'rgba(5,141,199,0.5)', 'rgba(80,180,50,0.5)', 'rgba(237,86,27,0.5)', 'rgba(200,150,100,0.5)'
  ]
});

const series = [
  {
    name: 'Market',
    id: 'market',
    data: [
      [1.1, 5000], [2.2, 5500], [3.4, 7500], [4.7, 9000], [5.3, 12000],
      [2.8, 6500], [1.6, 7000], [3.9, 11000], [4.1, 10000], [5.5, 15000],
      [2.3, 8000], [3.7, 8500], [4.2, 9500], [5.1, 13500]
    ],
    marker: {
      symbol: 'circle'
    }
  },
  {
    name: 'Member Facility',
    id: 'member',
    data: [
      [1.2, 4000], [2.5, 4500], [3.1, 6000], [4.3, 7000], [5.8, 9000],
      [1.9, 5000], [2.7, 5500], [3.8, 7000], [4.6, 8000], [5.2, 9500],
      [1.4, 6000], [3.5, 6500], [4.8, 7500], [5.4, 10000]
    ],
    marker: {
      symbol: 'triangle'
    }
  },
  {
    name: 'Comparison Facilities',
    id: 'comparison-facilities',
    data: [
      [1.3, 2000], [2.1, 3000], [3.5, 5000], [4.4, 6500], [5.6, 8000],
      [1.7, 2500], [2.8, 3500], [3.6, 5500], [4.9, 7000], [5.9, 8500],
      [2.2, 2800], [3.4, 4900], [4.5, 6700], [5.0, 8100]
    ],
    marker: {
      symbol: 'diamond'
    }
  }
];

Highcharts.chart('container', {
  chart: {
    type: 'scatter',
    zooming: {
      type: 'xy'
    }
  },
  title: {
    text: 'Quality vs. Rate Analysis',  // Título principal
    align: 'left'
  },
  subtitle: {
    text: 'Cardiology <br>Relationship between CMS quality ratings and reimbursement rates',  // Texto combinado
    align: 'left',
    useHTML: true  // Habilita HTML para usar <br> para saltos de línea
  },
  xAxis: {
    title: {
      text: 'CMS Quality Rating'
    },
    categories: ['1', '2', '3', '4', '5'],  // Categorías en el eje X
    tickInterval: 1,  // Intervalo de 1 en el eje X
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true
  },
  yAxis: {
    title: {
      text: 'Rate ($)'
    },
    min: 0,
    max: 16000,
    tickInterval: 4000,  // Múltiplos de 4000
    labels: {
      format: '${value}'  // Formato con el símbolo de dólar
    }
  },
  legend: {
    enabled: true,
    verticalAlign: 'top',  // Mueve la leyenda a la parte superior
    layout: 'horizontal',  // Coloca la leyenda horizontalmente
    align: 'center'  // Alinea la leyenda al centro
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        symbol: 'circle',
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      },
      jitter: {
        x: 0.005
      }
    }
  },
  tooltip: {
    pointFormat: 'CMS Quality Rating: {point.x}<br/>Rate: ${point.y}'
  },
  series: series
});
