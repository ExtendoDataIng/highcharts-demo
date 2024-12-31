const data = 
[
    [
        "x",
        "Behavioral Health",
        "Cardiovascular",
        "General Medicine",
        "General Surgery",
        "Gynecology",
        "Neonatology",
        "Obstetrics",
        "Oncology",
        "Pulmonary"
    ],
    [
        -5,
        0.0004,
        0,
        0,
        0,
        0,
        0.0001,
        0,
        0,
        0
    ],
    [
        -4,
        0.0044,
        0,
        0,
        0,
        0,
        0.0017,
        0,
        0,
        0
    ],
    [
        -3,
        0.0298,
        0,
        0,
        0,
        0,
        0.0141,
        0,
        0,
        0
    ],
    [
        -2,
        0.1343,
        0,
        0.0009,
        0,
        0,
        0.076,
        0,
        0,
        0
    ],
    [
        -1,
        0.3984,
        0,
        0.0202,
        0,
        0,
        0.2705,
        0,
        0,
        0
    ],
    [
        0,
        0.7781,
        0,
        0.1873,
        0,
        0,
        0.6347,
        0,
        0,
        0
    ],
    [
        1,
        1,
        0,
        0.6874,
        0,
        0,
        0.9814,
        0,
        0,
        0
    ],
    [
        2,
        0.8459,
        1,
        1,
        1,
        1,
        1,
        0.0303,
        1,
        1
    ],
    [
        3,
        0.471,
        1,
        0.5765,
        0.073,
        1,
        0.6715,
        1,
        1,
        1
    ],
    [
        4,
        0.1726,
        0,
        0.1317,
        0,
        0,
        0.2972,
        0.0026,
        0,
        0
    ],
    [
        5,
        0.0416,
        0,
        0.0119,
        0,
        0,
        0.0867,
        0,
        0,
        0
    ],
    [
        6,
        0.0066,
        0,
        0.0004,
        0,
        0,
        0.0167,
        0,
        0,
        0
    ],
    [
        7,
        0.0007,
        0,
        0,
        0,
        0,
        0.0021,
        0,
        0,
        0
    ],
    [
        8,
        0,
        0,
        0,
        0,
        0,
        0.0002,
        0,
        0,
        0
    ],
    [
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    [
        10,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
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
        min: -5,
        max: 10,
        accessibility: {
            description: 'Range from 1 to 100.'
        }
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
                seriesId: 'Behavioral Health',
                data: ['x', 'Behavioral Health']
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
                text: 'Behavioral Health',
                align: 'left'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                plotLines: [
                    {
                        value: 0.45,
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
                        value: 3,
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
                        value: 4.34,
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
                        value: -3.4,
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
                        value: 0,
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
            },
        },
    }, {
        renderTo: 'dashboard-col-2',
        type: 'Highcharts',
        connector: {
            id: 'connector-1',
            columnAssignment: [{
                seriesId: 'Cardiovascular',
                data: ['x', 'Cardiovascular']
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
                text: 'Cardiovascular',
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
