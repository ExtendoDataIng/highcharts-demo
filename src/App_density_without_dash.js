import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import data from './data.json'; // Import the JSON file directly

// Set default Highcharts options
Highcharts.setOptions({
    chart: {
        type: 'area', // Set the default chart type to area
        spacingTop: 20,
        spacingBottom: 20
    },
    title: {
        align: 'left',
        margin: 0,
        x: 30
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    xAxis: {
        crosshair: true,
        labels: {
            format: '{value} km' // Format x-axis labels
        },
        accessibility: {
            description: 'Kilometers',
            rangeDescription: '0km to 6.5km'
        }
    },
    yAxis: {
        title: {
            text: null // Set y-axis title to null
        }
    },
    tooltip: {
        positioner: function () {
            return {
                x: this.chart.chartWidth - this.label.width, // Right aligned tooltip
                y: 10 // Align to title
            };
        },
        borderWidth: 0,
        backgroundColor: 'none',
        pointFormat: '{point.y}', // Format point in tooltip
        headerFormat: '',
        shadow: false,
        valueDecimals: 0
    }
});

const App = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const parsedData = data;

        // Parse data for Highcharts
        setChartData({
            xData: parsedData.xData,
            speed: parsedData.datasets[0].data,
            elevation: parsedData.datasets[1].data,
            heartRate: parsedData.datasets[2].data
        });
    }, []);

    useEffect(() => {
        if (chartData) {
            // Render charts for Speed, Elevation, and Heart Rate
            Highcharts.chart('dashboard-cell-0', {
                renderTo: 'dashboard-cell-0',
                title: { text: 'Speed' },
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix: ' km/h'
                },
                series: [{
                    type: 'line',
                    name: 'Speed',
                    data: chartData.speed
                }]
            });

            Highcharts.chart('dashboard-cell-1', {
                renderTo: 'dashboard-cell-1',
                title: { text: 'Elevation' },
                tooltip: {
                    valueSuffix: ' m'
                },
                series: [{
                    type: 'line',
                    name: 'Elevation',
                    data: chartData.elevation
                }]
            });

            Highcharts.chart('dashboard-cell-2', {
                renderTo: 'dashboard-cell-2',
                title: { text: 'Heart Rate' },
                tooltip: {
                    valueSuffix: ' bpm'
                },
                series: [{
                    type: 'line',
                    name: 'Heart Rate',
                    data: chartData.heartRate
                }]
            });
        }
    }, [chartData]);

    return (
        <div>
            {!chartData ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div id="dashboard-cell-0" style={{ height: '300px' }}></div>
                    <div id="dashboard-cell-1" style={{ height: '300px' }}></div>
                    <div id="dashboard-cell-2" style={{ height: '300px' }}></div>
                </>
            )}
        </div>
    );
};

export default App;
