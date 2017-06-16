$(".sub").hide();
$("#goback").hide();
$('#search-query').on('click', function() {
    $('.results').show();
})
function showgraph(test) {
    $('.results').hide();
    console.log('clicking')
    var update = {
        width: 600, // or any new width
        height: 600 // " "
    };
    $('.graph1').show();
    $('.graph2').show();
    $('.graph3').show();
    $('.graph4').show();
    id1 = 'graph-' + test + '1';
    $(".graph1").attr('id', id1);
    id2 = 'graph-' + test + '2';
    $(".graph2").attr('id', id2);
    id3 = 'graph-' + test + '3';
    $(".graph3").attr('id', id3);
    id4 = 'graph-' + test + '4';
    $(".graph4").attr('id', id4);
    $(".sub").show();
    path = __dirname + "/public/files/graphcsv/" + test + ".csv"
    console.log(path)
    name1 = 'graph-' + test + '1';
    name2 = 'graph-' + test + '2';
    name3 = 'graph-' + test + '3';
    name4 = 'graph-' + test + '4';
    Plotly.d3.csv(path, function(err, rows) {
        trace00 = {
            x: rows.map(function(row) {
                return row['Year']
            }),
            y: rows.map(function(row) {
                return row['ArticleCount']
            }),
            name: 'ArticleCount',
            text: rows.map(function(row) {
                return row['Month']
            }),
            type: 'bar',
            xaxis: 'x',
            yaxis: 'y'
        };
        trace01 = {
            x: rows.map(function(row) {
                return row['Year']
            }),
            y: rows.map(function(row) {
                return row['CitationCount']
            }),
            name: 'CitationCount',
            text: rows.map(function(row) {
                return row['Month']
            }),
            type: 'bar'
        };
        data0 = [trace00, trace01];
        layout0 = {
            autosize: true,
            hovermode: 'closest',
            title: "Article count vs Citation Count",
            xaxis: {
                autorange: true,
                domain: [
                    0, 1
                ],
                range: [
                    2004.5, 2016.5
                ],
                type: 'linear'
            },
            yaxis: {
                autorange: true,
                domain: [
                    0, 1
                ],
                range: [
                    0, 100
                ],
                type: 'linear'
            }
        };
        Plotly.plot(name1, {
            data: data0,
            layout: layout0
        });
        Plotly.d3.csv(path, function(err, rows) {
            var POP_TO_PX_SIZE = 2e10;
            var trace1 = {
                mode: 'markers',
                type: 'bar',
                x: rows.map(function(row) {
                    return row['Year']
                }),
                y: rows.map(function(row) {
                    return row['CitationCount']
                }),
                text: rows.map(function(row) {
                    return row['Name']
                })
            };
            layout1 = {
                autosize: true,
                hovermode: 'closest',
                legend: {
                    x: 0.5,
                    y: -0.25,
                    orientation: "h",
                    traceorder: "normal",
                    xanchor: "center"
                },
                title: "Citation count vs Year",
                xaxis: {
                    autorange: true,
                    range: [
                        2009.5, 2016.5
                    ],
                    title: 'Year',
                    type: 'linear'
                },
                yaxis: {
                    autorange: true,
                    range: [
                        0, 4047.36842105
                    ],
                    title: 'Citation Count',
                    type: 'linear'
                }
            };
            Plotly.plot(name2, [trace1], layout1, {showLink: false});
        });
        Plotly.d3.csv(path, function(err, rows) {
            var POP_TO_PX_SIZE = 2e10;
            var trace2 = {
                mode: 'markers',
                type: 'bar',
                x: rows.map(function(row) {
                    return row['Year']
                }),
                y: rows.map(function(row) {
                    return row['ArticleCount']
                }),
                text: rows.map(function(row) {
                    return row['Name']
                })
            };
            var layout2 = {
                autosize: true,
                hovermode: "closest",
                legend: {
                    x: 0.5,
                    y: -0.25,
                    orientation: "h",
                    traceorder: "normal",
                    xanchor: "center"
                },
                title: "Article count vs Year",
                xaxis: {
                    autorange: true,
                    fixedrange: false,
                    range: [
                        1982.5, 2016.5
                    ],
                    title: "Year",
                    type: "linear"
                },
                yaxis: {
                    autorange: true,
                    range: [
                        0, 33.6842105263
                    ],
                    title: "Article Count",
                    type: "linear"
                }
            };
            Plotly.plot(name3, [trace2], layout2, {showLink: false});
        });
        Plotly.d3.csv(path, function(err, rows) {
            var POP_TO_PX_SIZE = 2e10;
            var trace3 = {
                mode: 'markers',
                type: 'pie',
                direction: "counterclockwise",
                hoverinfo: "label+value+text+percent",
                sort: true,
                textinfo: "value+percent",
                labels: rows.map(function(row) {
                    return row['Month']
                }),
                values: rows.map(function(row) {
                    return row['ArticleCount']
                }),
                text: rows.map(function(row) {
                    return row['Name']
                })
            };
            var layout3 = {
                autosize: true,
                hovermode: "closest",
                legend: {
                    x: 1.00343949045,
                    y: 0.910994764398
                },
                title: "Article Count per month"
            };
            Plotly.plot(name4, [trace3], layout3, {showLink: false});
        });
    });
    Plotly.relayout(name1, update);
    Plotly.relayout(name2, update);
    Plotly.relayout(name3, update);
    Plotly.relayout(name4, update);
    Plotly.deleteTraces(name1, 0);
    Plotly.deleteTraces(name1, 0);
    Plotly.deleteTraces(name2, 0);
    Plotly.deleteTraces(name3, 0);
    Plotly.deleteTraces(name4, 0);
}
$('.graph1').on('click', function() {
    var update = {
        width: 1200, // or any new width
        height: 700 // " "
    };
    Plotly.relayout(this.id, update);
    $('.graph2').hide();
    $('.graph3').hide();
    $('.graph4').hide();
    $('#goback').show();
});
$('.graph2').on('click', function() {
    var update = {
        width: 1200, // or any new width
        height: 700 // " "
    };
    Plotly.relayout(this.id, update);
    $('.graph2').addClass("move-left")
    $('.graph1').hide();
    $('.graph3').hide();
    $('.graph4').hide();
    $('#goback').show();
});
$('.graph3').on('click', function() {
    var update = {
        width: 1200, // or any new width
        height: 700 // " "
    };
    Plotly.relayout(this.id, update);
    $('.graph1').hide();
    $('.graph2').hide();
    $('.graph4').hide();
    $('#goback').show();
});
$('.graph4').on('click', function() {
    var update = {
        width: 1200, // or any new width
        height: 700 // " "
    };
    Plotly.relayout(this.id, update);
$('.graph4').addClass("move-left")
    $('.graph1').hide();
    $('.graph2').hide();
    $('.graph3').hide();
    $('#goback').show();
});
$('#goback').on('click', function() {
    var update = {
        width: 525, // or any new width
        height: 475 // " "
    };
    var graph1id = $(".graph1").attr('id');
    var graph2id = $(".graph2").attr('id');
    var graph3id = $(".graph3").attr('id');
    var graph4id = $(".graph4").attr('id');
    $('.graph2').removeClass("move-left")
    $('.graph4').removeClass("move-left")
    Plotly.relayout(graph1id, update);
    Plotly.relayout(graph2id, update);
    Plotly.relayout(graph3id, update);
    Plotly.relayout(graph4id, update);

    $('.graph1').show();
    $('.graph2').show();
    $('.graph3').show();
    $('.graph4').show();
    $('#goback').hide();
})
