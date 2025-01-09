document.addEventListener('DOMContentLoaded', function () {
  const viz_type = [
		"General Surgery",
		"Obstetrics",
		"Behavioral Health",
		"Neonatology",
		"Cardiovascular",
		"Pulmonary",
		"Oncology",
		"Gynecology",
		"General Medicine"
	];

  const dataJson =    [
		{
			"metric_value": 2.82,
			"viz_type": "Gynecology"
		},
		{
			"metric_value": 0.25,
			"viz_type": "Behavioral Health"
		},
		{
			"metric_value": 2.62,
			"viz_type": "Gynecology"
		},
		{
			"metric_value": 2.61,
			"viz_type": "Behavioral Health"
		},
		{
			"metric_value": 0.25,
			"viz_type": "Behavioral Health"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Gynecology"
		},
		{
			"metric_value": 3.07,
			"viz_type": "Behavioral Health"
		},
		{
			"metric_value": 3.07,
			"viz_type": "Gynecology"
		},
		{
			"metric_value": 2.29,
			"viz_type": "Behavioral Health"
		},
		{
			"metric_value": 2.36,
			"viz_type": "Gynecology"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Cardiovascular"
		},
		{
			"metric_value": 2.71,
			"viz_type": "Cardiovascular"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Cardiovascular"
		},
		{
			"metric_value": 3.17,
			"viz_type": "Cardiovascular"
		},
		{
			"metric_value": 2.44,
			"viz_type": "Cardiovascular"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Oncology"
		},
		{
			"metric_value": 2.61,
			"viz_type": "Oncology"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Oncology"
		},
		{
			"metric_value": 3.06,
			"viz_type": "Oncology"
		},
		{
			"metric_value": 2.32,
			"viz_type": "Oncology"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Pulmonary"
		},
		{
			"metric_value": 2.61,
			"viz_type": "Pulmonary"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Pulmonary"
		},
		{
			"metric_value": 3.07,
			"viz_type": "Pulmonary"
		},
		{
			"metric_value": 2.33,
			"viz_type": "Pulmonary"
		},
		{
			"metric_value": 2.09,
			"viz_type": "Neonatology"
		},
		{
			"metric_value": 2.12,
			"viz_type": "Neonatology"
		},
		{
			"metric_value": 2.09,
			"viz_type": "Neonatology"
		},
		{
			"metric_value": 2.88,
			"viz_type": "Neonatology"
		},
		{
			"metric_value": 1.73,
			"viz_type": "Neonatology"
		},
		{
			"metric_value": 2.82,
			"viz_type": "General Surgery"
		},
		{
			"metric_value": 2.61,
			"viz_type": "General Surgery"
		},
		{
			"metric_value": 2.82,
			"viz_type": "General Surgery"
		},
		{
			"metric_value": 3.07,
			"viz_type": "General Surgery"
		},
		{
			"metric_value": 2.35,
			"viz_type": "General Surgery"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Obstetrics"
		},
		{
			"metric_value": 2.61,
			"viz_type": "Obstetrics"
		},
		{
			"metric_value": 2.82,
			"viz_type": "Obstetrics"
		},
		{
			"metric_value": 3.07,
			"viz_type": "Obstetrics"
		},
		{
			"metric_value": 2.25,
			"viz_type": "Obstetrics"
		},
		{
			"metric_value": 2.82,
			"viz_type": "General Medicine"
		},
		{
			"metric_value": 2.61,
			"viz_type": "General Medicine"
		},
		{
			"metric_value": 2.82,
			"viz_type": "General Medicine"
		},
		{
			"metric_value": 2.96,
			"viz_type": "General Medicine"
		},
		{
			"metric_value": 2.33,
			"viz_type": "General Medicine"
		}
	];

  let redrawing = false;

  // Create the series data dynamically from the viz_type array
  let dataArray = [];
  for (let i = 0; i < viz_type.length; i++) {
    dataArray.push([]);  // Create an empty array for each viz_type
  }

  // Map the data to the correct position based on viz_type
  dataJson.forEach((e) => {
    viz_type.forEach((key, value) => {
      if (e.viz_type === key) {
        dataArray[value].push(e.metric_value); // Assuming 'metric_value' is the data you want to plot
      }
    });
  });

  // Continue with the existing code for processing and plotting the chart
  let step = 1,
    precision = 0.00000000001,
    width = 4;

  let data = processDensity(
    step,
    precision,
    width,
    ...dataArray // Use the dynamic dataArray with spread operator
  );

  let chartsNbr = data.results.length;
  let xi = data.xiData;
  let stat = data.stat;

  let dataSeries = [],
    series = [];
  data.results.forEach((e, i) => {
    dataSeries.push([]);
    dataSeries[i] = e;
    series.push({
      data: dataSeries[i],
      name: viz_type[i],
      zIndex: chartsNbr - i
    });
  });

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
                    [0.25, "#FFA500"], // orange
                    [0.5, "#FF0033"], // red
                    [0.75, "#7A378B"] // purple
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
      text: "Rate Distribution"
    },
    xAxis: {
      labels: { format: "{value} % " },
      min: -1.99999,
    },
    yAxis: {
      title: { text: null },
      categories: viz_type,
      max: data.results.length,
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
      pointFormat: "<b>{series.name}</b>: {point.x} % <br/>",
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
});
