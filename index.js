    var express = require('express');
    var router = express.Router();
    var request = require("request");
    var fs = require("fs");
    var path = require("path");
    var util = require("./util");
    var hbs = require('hbs');
    var mongoose = require("mongoose");
    var svgCaptcha = require("svg-captcha");
    module.exports = {
        updateCsv : function(){
            util.generateJournalList(function(journals) {
                    util.generateAllArticleCitvsYearCsv();
                    for (k = 0; k < journals.length; k++) {
                        util.generateArticleCitvsYearCsv(journals[k]);
                    }
                })
            }
        }
