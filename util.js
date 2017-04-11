var crypto = require("crypto");
var request = require("request");
var fs = require("fs");
var path = require("path");
var reqq = require("sync-request")

var sleep = require('system-sleep');

let journals = []
let data = []
var name = []
let count;
module.exports = {
    randomString: function(howMany, chars) {
        chars = chars || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
        var rnd = crypto.randomBytes(howMany),
            value = new Array(howMany),
            len = chars.length;
        for (var i = 0; i < howMany; i++) {
            value[i] = chars[rnd[i] % len];
        }

        return value.join('');
    },

    jsonToCsv: function(json_data) {
        var data = json_data.results[0];
        //console.log("data:" data);
        var csv = "";

        csv += data.columns.join(',') + '\n';
        //console.log(data.data.length);
        for (var i = 0; i < data.data.length; i++) {
            //console.log(data.data[i].row);
            csv += '"' + data.data[i].row.join('","') + '"\n';
        }

        return csv;
    },
    generateJournalList: function(callback) {
        var NEO4J_API_URL = "http://pesitsouthscibase.org:7474/db/data/transaction/commit";
        var NEO4J_USER = "neo4j";
        var NEO4J_PASS = "scibase";
        var query = "MATCH (j:Journal) RETURN j.Name as Name";

            // console.log(return_param);

        var request_json = {
            "statements": [{
                "statement": query
            }]
        };
        var auth_payload = new Buffer(NEO4J_USER + ":" + NEO4J_PASS).toString('base64');
        var res = request({
            url: NEO4J_API_URL,
            method: "POST",
            json: request_json,
            headers: {
                "Authorization": "Basic " + auth_payload,
                "Accept": "application/json; charset=UTF-8"
            }
        }, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                //var file_name_base = util.randomString(20);
                //console.log(JSON.stringify(response_body));
                try {
                    data = body.results[0]
fs.writeFileSync(path.join(__dirname, "public/files/graphcsv/", "Journals.csv"), module.exports.jsonToCsv(body), 'utf-8');
                    for (var i = 0; i < data.data.length; i++) {
                        journal = ""
                            //console.log(data.data[i].row[0]);
                        journal = data.data[i].row[0].toString();
                        journals.push(journal);
                        console.log(journals)
                    }

                    console.log("Callback before")

                    console.log("Callback after")



                } catch (e) {
                    console.log("Error:", e.message);
                }
            } else {
                console.log("Unable to generate Journal.csv !");
            }
            callback(journals.sort())
        });
    },


    generateArticleCitvsYearCsv: function(i) {

        var data1;

        var NEO4J_API_URL = "http://pesitsouthscibase.org:7474/db/data/transaction/commit";
        var NEO4J_USER = "neo4j";
        var NEO4J_PASS = "scibase";
        base_query_1 = "MATCH p=(j:Journal)-[c:CONTAINS]->(a:Article)where j.Name = '"
        base_query_2 = "'optional match q=(j:Journal)-[c:CONTAINS]->(a:Article)-[:CITED_BY]-()  return j.Name as Name,a.Year as Year,a.Month as Month,count(distinct p)as ArticleCount,count(q)as CitationCount order by j.Name, a.Year, a.Month "

        var query = base_query_1 + i + base_query_2;
        kk = i + ".csv"

        var request_json = {
            "statements": [{
                "statement": query
            }]
        };
        var auth_payload = new Buffer(NEO4J_USER + ":" + NEO4J_PASS).toString('base64');




console.log("fetching : %s",i)

    var res = request({
        url: NEO4J_API_URL,
        method: "POST",
        json: request_json,
        headers: {
            "Authorization": "Basic " + auth_payload,
            "Accept": "application/json; charset=UTF-8"
        }
    }, function(err, response, body) {
        data[i] = body;
        name[i] = kk;
        count=count+1;
        console.log(count)
        });

    },
    writetoCSV:function(){
        console.log("writing")
        console.log(data)
        console.log(count)
        for(i=0;i<count;i++){
            console.log("writing: %s",name[i])
        fs.writeFileSync(path.join(__dirname, "public/files/graphcsv/", name[i]), module.exports.jsonToCsv(data[i]), 'utf-8');
    }
    },
//fs.writeFileSync(path.join(__dirname, "public/files/graphcsv/", kk), module.exports.jsonToCsv(body), 'utf-8');

    generateAllArticleCitvsYearCsv: function() {
        var NEO4J_API_URL = "http://pesitsouthscibase.org:7474/db/data/transaction/commit";
        var NEO4J_USER = "neo4j";
        var NEO4J_PASS = "scibase";
        var query = "MATCH p=(j:Journal)-[c:CONTAINS]->(a:Article) optional match q=(j:Journal)-[c:CONTAINS]->(a:Article)-[:CITED_BY]-() return j.Name as Name,a.Year as Year,a.Month as Month,count(distinct p)as ArticleCount,count(q)as CitationCount order by j.Name, a.Year, a.Month";

        console.log("fetching");

        var request_json = {
            "statements": [{
                "statement": query
            }]
        };
        var auth_payload = new Buffer(NEO4J_USER + ":" + NEO4J_PASS).toString('base64');
        var res = request({
            url: NEO4J_API_URL,
            method: "POST",
            json: request_json,
            headers: {
                "Authorization": "Basic " + auth_payload,
                "Accept": "application/json; charset=UTF-8"
            }
        }, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                //var file_name_base = util.randomString(20);
                //console.log(JSON.stringify(response_body));
                try {
                    fs.writeFileSync(path.join(__dirname, "public/files/graphcsv/", "generateAllArticleCitvsYear.csv"), module.exports.jsonToCsv(body), 'utf-8');
                    //fs.writeFileSync("/files/papers/Journal.csv",module.exports.jsonToCsv(body), 'utf-8');
                } catch (e) {
                    console.log("Error:", e.message);
                }
            } else {
                console.log("Unable to generate Journal.csv !");
            }
        });
    },
};
