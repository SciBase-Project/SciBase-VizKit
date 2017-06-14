var fs = require("fs");
var graph_request = function(id) {
    var colors = ["#266348", "#6242f4", "#00a838", "#1c2820", "#a80008"];
    var actualId = id.replace('G', '0');
    var hierarchy = id.split("-");
    fs.readFile(__dirname + '/public/files/TerenceTaoFirstArticle/' + actualId + '.json', {
        encoding: "utf8"
    }, (err, data) => {
        if (err) {
            console.log("invalid ID");
            alert(JSON.stringify(err));
            return;
        }
        var obj = JSON.parse(data);
        var l = hierarchy.length;
        var nodes = [];
        var edgePairs = [];
        for (var i = 0; obj.referenced_articles && i < obj.referenced_articles.length; i++) {
            item = {};
            item["label"] = obj.referenced_articles[i].articleId;
            item["id"] = id + "-" + i;
            item["color"] = {
                border: colors[l],
                background: colors[l],
                highlight: colors[l]
            };
            item["title"] = obj.referenced_articles[i].title;

            edgePairItem = {};
            edgePairItem.from = id;
            edgePairItem.to = item["id"];
            nodes.push(item);
            edgePairs.push(edgePairItem);
        }
        var graph = {};
        graph.nodes = nodes;
        graph.edges = edgePairs;
        alert(JSON.stringify(graph));
        return graph;
    });
}

var firstNode = {
    id: "G",
    label: "5452187",
    color: {
        border: "#a80008",
        background: "#a80008",
        highlight: "#a80008"
    },
    title: "The Power of Convex Relaxation: Near-Optimal Matrix Completion"
};
var edgePair = {};
var graph = {};
graph.nodes = firstNode;
graph.edges = edgePair;

var nodes = new vis.DataSet();
var graphInitNodes = graph.nodes;
nodes.add(graphInitNodes);

// create an array with edges
var edges = new vis.DataSet([]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes: {
        shape: "circle",
        borderWidth: 1,
        borderWidthSelected: 2,
        brokenImage: undefined,
        chosen: true,
        font: {
            color: '#fff'
        }
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);

$(document).ready(function() {
    network.once('initRedraw', function() {
        network.moveTo({
            scale: 1.0,
            offset: {
                x: 400,
                y: 300
            },
            animation: true
        });
        // console.log(network.getViewPosition());
    });
    $("#preloader").css("display", "none");

    $("#graph_animation").on('hidden.bs.modal', function() {
        nodes.clear();
        edges.clear();
        nodes.add(graphInitNodes);
    });

    $('[data-toggle="tooltip"]').tooltip();

    network.on("click", function(args) {
        if (args.nodes.length) {
            // console.log(args.nodes);
            // alert("Clicked");
            console.log("GRAPH EMMITTED");
            $("#preloader").css("display", "block");
            // var g = graph_request(args.nodes[0]);

            var id = args.nodes[0];

            // alert("Here");
            var colors = ["#266348", "#6242f4", "#00a838", "#1c2820", "#a80008"];
            var actualId = id.replace('G', '0');
            var hierarchy = id.split("-");
            fs.readFile(__dirname + '/public/files/TerenceTaoFirstArticle/' + actualId + '.json', {
                encoding: "utf8"
            }, (err, data) => {
                if (err) {
                    console.log("invalid ID");
                    alert(JSON.stringify(err));
                    return;
                }
                var obj = JSON.parse(data);
                var l = hierarchy.length;
                var extraNodes = [];
                var edgePairs = [];
                for (var i = 0; obj.referenced_articles && i < obj.referenced_articles.length; i++) {
                    item = {};
                    item["label"] = obj.referenced_articles[i].articleId;
                    item["id"] = id + "-" + i;
                    item["color"] = {
                        border: colors[l],
                        background: colors[l],
                        highlight: colors[l]
                    };
                    item["title"] = obj.referenced_articles[i].title;

                    edgePairItem = {};
                    edgePairItem.from = id;
                    edgePairItem.to = item["id"];
                    extraNodes.push(item);
                    edgePairs.push(edgePairItem);
                }
                var graph = {};
                graph.nodes = extraNodes;
                graph.edges = edgePairs;
                // alert(JSON.stringify(graph));
                nodes.add(graph.nodes);
                edges.add(graph.edges);
                $("#preloader").css("display", "none");

            });
        }
    });
});
