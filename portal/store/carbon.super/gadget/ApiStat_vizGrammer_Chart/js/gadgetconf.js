var charts = [{
    name: "ResponseTimeSuccessCount",
    columns: ["API", "Response-Time"],
    schema: [{
        "metadata": {
            "names": ["API", "Response-Time"],
            "types": ["ordinal", "linear"]
        },
        "data": []
    }],
    "chartConfig": {
        "x": "API",
        "xTitle":"API",
        "yTitle": "Response Time (ms)",
        "maxLength": "30000",
        "barGap": 1,
        highlight: "multi",
        tooltip: {"enabled":true,"color":"#828b94"},
        "padding": {"top": 30, "left": 100, "bottom": 38, "right": 55},
        "charts": [{type: "bar", y:"Response-Time", orientation: "left"}]
    },
    types: [
        {name: TYPE_LANDING, type: 1, filter: 3}
    ],
    mode: "USERNAME",
    colorCode: "SUCCESS",
    processData: function (data) {
        var result = [];
        data.forEach(function (row, i) {
            var ResponseTime = row['Time'];
            var Api = row["API"];

            result.push([Api, ResponseTime]);
        });
        return result;
    }
},
    {
        name: "applicationThrottledCountsSuccessCount",
        columns: ["API", "Count","engineType"],
        schema: [{
            "metadata": {
                "names": ["API", "Count","engineType"],
                "types": ["ordinal", "linear","ordinal"]
            },
            "data": []
        }],
        "chartConfig": {
            "x": "API",
            "xTitle":"API",
            "yTitle": "Request Count",
            "maxLength": "30000",
            "width": 600,
            "barGap": 0.5,
            highlight: "multi",
            "padding": {"top": 30, "left": 100, "bottom": 38, "right": 55},
            tooltip: {"enabled":true,"color":"#828b94"},
            "charts": [{type: "bar", y: "Count",  color: "engineType", orientation: "left", mode:"stack"}]
        },
        types: [
            {name: TYPE_LANDING, type: 2, filter: 4}
        ],
        mode: "USERNAME",
        colorCode: "SUCCESS",
        processData: function (data) {
            var result = [];
            data.forEach(function (row, i) {
                var value = row['value'];
                var key = row["key"];
                var engineType = row["EngineType"];

                result.push([key, value,engineType]);
            });
            return result;
        }
    },

    {
        name: "UsageComparisonSuccessCount",
        schema: [{
            "metadata": {
                "names": ["API", "Requests"],
                "types": ["ordinal", "linear"]
            },
            "data": []
        }],
        "chartConfig": {
            "charts": [{type: "arc", "x": "Requests", color: "API", mode: "pie"}],
            "xTitle": "Request Count",
            tooltip: {"enabled":true,"color":"#828b94", "type":"symbol", "content":["API","Requests"]},
            "yTitle": "Request Count",
            colorScale:"category20b",
            percentage:true,
            "width": 500,
            "height": 700
        },
        types: [
            {name: TYPE_LANDING, type: 7, filter: 3}
        ],
        mode: "USERNAME",
        colorCode: "SUCCESS",
        processData: function (data) {
            var result = [];
            data.forEach(function (row, i) {
                var value = row['Request_Count'];
                var key = row["Api"];

                result.push([key, value]);
            });
            return result;
        }
    },
    {
        name: "ApiThrottledOutRequestsSuccessCount",
        columns: ["Date", "Requests","engineType"],
        schema: [{
            "metadata": {
                "names": ["Date", "Requests","engineType"],
                "types": ["ordinal", "linear","ordinal"]
            },
            "data": []
        }],

        "chartConfig": {
            "x": "Date",
            "xTitle":"Date",
            "yTitle": "Request Count",
            "padding": {"top": 30, "left": 50, "bottom": 50, "right": 70},
            "charts": [{type: "line", y: "Requests",  range:true, color: "engineType", mode:"stack"}]
        },
        types: [
            {name: TYPE_LANDING, type: 9, filter: 10}
        ],
        mode: "USERNAME",
        colorCode: "SUCCESS",
        processData: function (data) {
            var result = [];
            data.forEach(function (row, i) {
                var value = row['value'];
                var key = row["key"];
                var engineType = row["EngineType"];

                result.push([key, value,engineType]);
            });
            return result;
        }
    },
    {
        name: "scatterSuccessCount",
        columns: ["API", "Requests","weight"],
        schema: [{
            "metadata": {
                "names": ["API", "Requests", "weight"],
                "types": ["ordinal", "linear","linear"]
            },
            "data": []
        }],

        "chartConfig": {
            "x": "API",
            "xTitle":"API",
            "yTitle": "Request Count",
            "padding": {"top": 30, "left": 50, "bottom": 50, "right": 70},
            "charts": [{type: "scatter", y: "Requests", size : "weight" ,color :"API"}]
        },
        types: [
            {name: TYPE_LANDING, type: 11, filter: 3}
        ],
        mode: "USERNAME",
        colorCode: "SUCCESS",
        processData: function (data) {
            var result = [];
            data.forEach(function (row, i) {
                var value = row['value'];
                var key = row["key"];
                var weight = row["weight"];

                result.push([key, value, weight]);
            });
            return result;
        }
    },
    {
        name: "ApiFaultRequestsSuccessCount",
        columns: ["API", "Requests","engineType"],
        schema: [{
            "metadata": {
                "names": ["API", "Requests","engineType"],
                "types": ["ordinal", "linear","ordinal"]
            },
            "data": []
        }],

        "chartConfig": {
            "x": "API",
            "xTitle":"API",
            "yTitle": "Request Count",
            "padding": {"top": 30, "left": 50, "bottom": 50, "right": 70},
            "charts": [{type: "line", y: "Requests",  range:true, color: "engineType", mode:"stack"}]
        },
        types: [
            {name: TYPE_LANDING, type: 12, filter: 3}
        ],
        mode: "USERNAME",
        colorCode: "SUCCESS",
        processData: function (data) {
            var result = [];
            data.forEach(function (row, i) {
                var value = row['value'];
                var key = row["key"];
                var engineType = row["EngineType"];

                result.push([key, value,engineType]);
            });
            return result;
        }
    },
{
        name: "UsageComparisonMaxSuccessCount",
        schema: [{
            "metadata": {
                "names": ["API", "Requests"],
                "types": ["ordinal", "linear"]
            },
            "data": []
        }],
        "chartConfig": {
            "charts": [{type: "arc", "x": "Requests", color: "API", mode: "pie"}],
            "xTitle": "Request Count",
            tooltip: {"enabled":true,"color":"#828b94", "type":"symbol", "content":["API","Requests"]},
            "yTitle": "Request Count",
            colorScale:"category20b",
            percentage:true,
            "width": 500,
            "height": 700
        },
        types: [
            {name: TYPE_LANDING, type: 7, filter: 3}
        ],
        mode: "USERNAME",
        colorCode: "SUCCESS",
        processData: function (data) {
            var result = [];
            data.forEach(function (row, i) {
                var value = row['Request_Count'];
                var key = row["Api"];

                result.push([key, value]);
            });
            return result;
        }
    },
   {
        name: "subscriptionSuccessCount",
        schema: [{
            "metadata": {
                "names": ["API", "Subscriptions"],
                "types": ["ordinal", "linear"]
            },
            "data": []
        }],
        "chartConfig": {
            "charts": [{type: "arc", "x": "Subscriptions", color: "API", mode: "donut"}],
            "xTitle": "Subscriptions Count",
            tooltip: {"enabled": true, "color": "#828b94", "type": "symbol", "content": ["API", "Subscriptions"]},
            "yTitle": "Subscriptions Count",
            "width": 500,
            "height": 700
        },
        types: [
            {name: TYPE_LANDING, type: 11, filter: 3}
        ],
        mode: "USERNAME",
        colorCode: "SUCCESS",
        processData: function (data) {
            var result = [];
            data.forEach(function (row, i) {
                var value = row['weight'];
                var key = row["key"];
                result.push([key, value]);
            });
            return result;
        }
    }
];
