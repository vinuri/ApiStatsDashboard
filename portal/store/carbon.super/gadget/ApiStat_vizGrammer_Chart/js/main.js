var TOPIC_DATE_RANGE = "subscriber";
var TOPIC_PUB_USERPREF = "publisherUser";
var listnedTimeFromValue;
var listnedTimeToValue;
var listnedAdditionalUserPrefs = "";
var globalUniqueArray = [];
var successGlobalPage = 1;
var maxSuccessRcordValue;
var successDataObj;
var idpTypeFilter = "";
var selectedAppValue = null;
var selectedApiValue = null;
var select2AppDataSet = null;
var select2ApiDataSet = null;
var page = gadgetUtil.getCurrentPageName();

var prefs = new gadgets.Prefs();
var chartSuccess = gadgetUtil.getChart(prefs.getString(PARAM_GADGET_ROLE) + "SuccessCount");
var functionTypeSuccess = gadgetUtil.getRequestType(page, chartSuccess);
var filterType = gadgetUtil.getFilterType(page, chartSuccess);

$(function () {
    if (!chartSuccess) {
        $("#canvasSuccess").html(gadgetUtil.getErrorText("Gadget initialization failed. Gadget role must be provided."));
        $("#canvasFailure").html(gadgetUtil.getErrorText("Gadget initialization failed. Gadget role must be provided."));
        return;
    }
    listnedTimeFromValue = gadgetUtil.timeFrom();
    listnedTimeToValue = gadgetUtil.timeTo();
    onChange();

    $("#selectFilter").on("change", function (e) {
        selectedAppValue = select2AppDataSet[$(this).val()].text;
        successOnPaginationClicked();
    });

    $("#apiFilter").on("change", function (e) {
        selectedApiValue = select2ApiDataSet[$(this).val()].text;
        successOnPaginationClicked();
    });
});

function successOnPaginationClicked(e, originalEvent, type, page) {
    successGlobalPage = page;
    gadgetUtil.fetchData(CONTEXT, {
        type: functionTypeSuccess,
        timeFrom: listnedTimeFromValue,
        timeTo: listnedTimeToValue,
        selectedApiValue: selectedApiValue,
        selectedAppValue: selectedAppValue,
        start: (page - 1) * 10,
        count: 10
    }, successOnData, successOnError);
}

gadgets.HubSettings.onConnect = function () {
    gadgets.Hub.subscribe(TOPIC_DATE_RANGE, function (topic, data, subscriberData) {
        listnedTimeFromValue = data.timeFrom;
        listnedTimeToValue = data.timeTo;
        onChange();
    });
};

function onChange() {
    if (filterType != 3) {
        $('#canvasSuccess').css({"height": "70%"});
        gadgetUtil.syncfetchData(CONTEXT, {
            type: 4,
            timeFrom: listnedTimeFromValue,
            timeTo: listnedTimeToValue,
            idpType: idpTypeFilter,
            start: 0,
            count: 100
        }, addApplicationFilter, successOnError);
        if (filterType == 10) {
            gadgetUtil.syncfetchData(CONTEXT, {
                type: filterType,
                timeFrom: listnedTimeFromValue,
                timeTo: listnedTimeToValue,
                listnedAdditionalUserPrefs: listnedAdditionalUserPrefs,
                idpType: idpTypeFilter,
                start: 0,
                count: 100
            }, addAPIFilter, successOnError);
        } else {
            $('#ApiFilterGroup').hide();
        }
    } else {
        $('#filterGroup').hide();
        $('#canvasSuccess').css({"height": "95%"});
    }

    gadgetUtil.fetchData(CONTEXT, {
        type: functionTypeSuccess,
        timeFrom: listnedTimeFromValue,
        timeTo: listnedTimeToValue,
        selectedAppValue: selectedAppValue,
        selectedApiValue: selectedApiValue,
        start: 0,
        count: 20
    }, successOnData, successOnError);
};

function addApplicationFilter(response) {

    select2AppDataSet = response.message[0];
    if (selectedAppValue == null) {
        selectedAppValue = select2AppDataSet[0].text;
    }
    // Initialization of the user name select2
    var appSelect = $("#selectFilter").select2({
        data: select2AppDataSet,
        maximumInputLength: 10,
        tags: false,
        selectOnBlur: true
    });
};

function addAPIFilter(response) {
    select2ApiDataSet = response.message[0];
    if (selectedApiValue == null) {
        selectedApiValue = select2ApiDataSet[0].text;
    }
    // Initialization of the user name select2
    var apiSelect = $("#apiFilter").select2({
        data: select2ApiDataSet,
        maximumInputLength: 10,
        tags: false,
        selectOnBlur: true
    });
};

function successOnData(response) {
    try {
        successDataObj = response.message;
        if (successDataObj[0].length > 0) {
            maxSuccessRcordValue = successDataObj[0][0].ResponseTime;
        } else {
            maxSuccessRcordValue = 0;
        }
        drawChartSuccess();
    } catch (e) {
        //$('#canvas').html(gadgetUtil.getErrorText(e));
    }
};

function successOnError(msg) {
    $("#canvasSuccess").html(gadgetUtil.getErrorText(msg));
};

function drawChartSuccess() {
    var allDataCount = successDataObj[1];
    if (allDataCount == 0) {
        $("#canvasSuccess").html("No chart data available");
    } else {
        //perform necessary transformation on input data
        chartSuccess.schema[0].data = chartSuccess.processData(successDataObj[0]);
        //finally draw the chart on the given canvas
        chartSuccess.chartConfig.width = $("#canvasSuccess").width() - 20;
        console.info($("#canvasSuccess").width());
        console.info($("#canvasSuccess").height());
        chartSuccess.chartConfig.height = $("#canvasSuccess").height();

        var vg = new vizg(chartSuccess.schema, chartSuccess.chartConfig);
        $("#canvasSuccess").empty();
        vg.draw("#canvasSuccess", [{type: "click", callback: typeSuccessCallbackmethod}]);
    }
}

var typeSuccessCallbackmethod = function (event, item) {
    var userPrefKey = chartSuccess.chartConfig.x;
    var jsonObj = item.datum;
    var userPrefValue = "";
    for (var key in jsonObj) {
        if (key == userPrefKey) {
            userPrefValue = jsonObj[key];
        }
    }
    if (userPrefValue != "") {
        var valExist = false;
        if (globalUniqueArray.length != 0) {
            for (i = 0; i < globalUniqueArray.length; i++) {
                if (globalUniqueArray[i][2] == chartSuccess.mode) {
                    valExist = true;
                    globalUniqueArray[i][0] = TOPIC_PUB_USERPREF;
                    globalUniqueArray[i][1] = userPrefValue;
                    break;
                }
            }
            if (!valExist) {
                var arry = [TOPIC_PUB_USERPREF, userPrefValue, chartSuccess.mode];
                globalUniqueArray.push(arry);
            }
        } else {
            var arry = [TOPIC_PUB_USERPREF, userPrefValue, chartSuccess.mode];
            globalUniqueArray.push(arry);
        }
        var message = {
            userPrefValue: userPrefValue,
            mode: chartSuccess.mode,
            colorCode: chartSuccess.colorCode
        };
        gadgetUtil.updateURLParam(chartSuccess.mode, userPrefValue + "_" + chartSuccess.colorCode);
        gadgets.Hub.publish(TOPIC_PUB_USERPREF, message);
        $("#autocomplete-search-box .typeahead").typeahead('val', userPrefValue);
        $('#autocomplete-search-box .typeahead').prop('disabled', true);
        $('#add-filter').hide();
        $('#remove-filter').show();
    }
};