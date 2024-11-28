const data = [
    ['x', 'Cardiology', 'Orthopedics'],
    [1, 0.0001, 0.0001],
    [10, 0.001, 0.001],
    [20, 0.01, 0.01],
    [30, 0.15, 0.15],
    [40, 0.45, 0.45],
    [50, 1, 1],  // Pico de la campana en 1
    [60, 0.45, 0.45],
    [70, 0.15, 0.15],
    [80, 0.01, 0.01],
    [90, 0.001, 0.001],
    [100, 0.0001, 0.0001]
];

Highcharts.setOptions({
    chart: {
        spacingTop: 20,
        spacingBottom: 20,
        height: 300,
        type: 'spline',
        zooming: {
            type: 'xy'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        valueSuffix: '',
        stickOnContact: true
    },
    yAxis: {
        max: 1,
        min: 0,
        title: {
            text: null
        },
        labels: {
            format: '{value}'
        },
        accessibility: {
            description: 'Values from 0 to 1'
        }
    },
    xAxis: {
        min: 1,
        max: 100,
        accessibility: {
            description: 'Range from 1 to 100.'
        },
        plotLines: [
            {
                value: 30,
                color: 'black',
                width: 2,
                dashStyle: 'ShortDash',
                label: {
                    text: 'Facility 1',
                    align: 'center',
                    verticalAlign: 'top',
                    y: -15, // Alinea la etiqueta un poco más arriba
                    rotation: 0, // Asegura que la etiqueta se muestre de manera horizontal
                    style: {
                        color: 'black'
                    }
                }
            },
            {
                value: 50,
                color: 'black',
                width: 2,
                dashStyle: 'ShortDash',
                label: {
                    text: 'Facility 2',
                    align: 'center',
                    verticalAlign: 'top',
                    y: -15,
                    rotation: 0,
                    style: {
                        color: 'black'
                    }
                }
            },
            {
                value: 70,
                color: 'black',
                width: 2,
                dashStyle: 'ShortDash',
                label: {
                    text: 'Facility 3',
                    align: 'center',
                    verticalAlign: 'top',
                    y: -15,
                    rotation: 0,
                    style: {
                        color: 'black'
                    }
                }
            },
            {
                value: 90,
                color: 'black',
                width: 2,
                dashStyle: 'ShortDash',
                label: {
                    text: 'Facility 4',
                    align: 'center',
                    verticalAlign: 'top',
                    y: -15,
                    rotation: 0,
                    style: {
                        color: 'black'
                    }
                }
            },
            {
                value: 60,
                color: 'red',  // Color rojo para "Member"
                width: 2,
                dashStyle: 'ShortDash',
                label: {
                    text: 'Member',
                    align: 'center',
                    verticalAlign: 'top',
                    y: -15,
                    rotation: 0,  // Horizontal
                    style: {
                        color: 'red'
                    }
                }
            }
        ]
    }
});

Dashboards.board('container', {
    editMode: {
        enabled: true,
        contextMenu: {
            enabled: true
        }
    },
    dataPool: {
        connectors: [{
            id: 'connector-1',
            type: 'JSON',
            options: {
                data
            }
        }]
    },
    gui: {
        layouts: [{
            id: 'layout-1',
            rows: [{
                cells: [{
                    id: 'title'
                }]
            }, {
                cells: [{
                    id: 'dashboard-col-1'
                }]
            }, {
                cells: [{
                    id: 'dashboard-col-2'
                }]
            }]
        }]
    },
    components: [{
        renderTo: 'title',
        type: 'HTML',
        elements: [{
            tagName: 'h1',
            textContent: 'Rate Distribution'
        }, {
            tagName: 'div',
            children: [{
                tagName: 'a',
                class: 'subtitle',
                textContent: 'Distribution of rates across clinical categories'
            }]
        }]
    }, {
        renderTo: 'dashboard-col-1',
        type: 'Highcharts',
        connector: {
            id: 'connector-1',
            columnAssignment: [{
                seriesId: 'Cardiology',
                data: ['x', 'Cardiology']
            }]
        },
        sync: {
            extremes: true,
            highlight: true
        },
        chartOptions: {
            chart: {
                zooming: {
                    type: 'x'
                }
            },
            title: {
                text: 'Cardiology',
                align: 'left'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            }
        },
    }, {
        renderTo: 'dashboard-col-2',
        type: 'Highcharts',
        connector: {
            id: 'connector-1',
            columnAssignment: [{
                seriesId: 'Orthopedics',
                data: ['x', 'Orthopedics']
            }]
        },
        sync: {
            extremes: true,
            highlight: true
        },
        chartOptions: {
            chart: {
                zooming: {
                    type: 'x'
                }
            },
            title: {
                text: 'Orthopedics',
                align: 'left'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    colorIndex: 1
                }
            }
        },
    }]
}, true);
