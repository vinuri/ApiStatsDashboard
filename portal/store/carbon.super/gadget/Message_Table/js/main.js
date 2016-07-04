var timeFrom;
var timeTo;
var TOPIC_DATE_RANGE = "subscriber";
var prefs = new gadgets.Prefs();
var gadgetName = prefs.getString(PARAM_GADGET_ROLE);
var listnedTimeFromValue;
var listnedTimeToValue;


var gc = gadgetUtil.getGadgetConfig(gadgetName);
var gType = gc.type;
var gColumns = gc.columns;
var oTable;

$(function() {
    if (gType == null) {
        $("#canvas").html(gadgetUtil.getDefaultText());
        return;
    }

    listnedTimeFromValue = gadgetUtil.timeFrom();
    listnedTimeToValue = gadgetUtil.timeTo();
    drawTable();
});

function drawTable(){

    oTable = $('#tblMessages').DataTable({
        dom: '<"dataTablesTop"' +
        'f' +
        '<"dataTables_toolbar">' +
        '>' +
        'rt' +
        '<"dataTablesBottom"' +
        'lip' +
        '>',
        "searching": true,
        "columns" :gColumns,
        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
        "ajax": {
            "url" : CONTEXT,
            "data" : function (d) {
                d.type = gType;
                d.timeFrom = listnedTimeFromValue;
                d.timeTo = listnedTimeToValue;
            }
        }
    });
};


function onDataChanged() {
    oTable.clear().draw();
    oTable.ajax.reload().draw();
};


function onError(msg) {
    $("#canvas").html(gadgetUtil.getErrorText(msg));
};

gadgets.HubSettings.onConnect = function() {

    gadgets.Hub.subscribe(TOPIC_DATE_RANGE, function(topic, data, subscriberData) {
        listnedTimeFromValue = data.timeFrom;
        listnedTimeToValue = data.timeTo;
        var date = new Date(listnedTimeFromValue);
        onDataChanged();
    });
};
