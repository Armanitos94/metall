(function($) {
  "use strict";

  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1BlI5fM_kmfPrXh_9j0OLyrA9zPWVxJaLnc9JlaYmivc/pubhtml';

  // Builds the HTML Table out of collection.
  function buildHtmlTable(collection, selector) {
    var columns = addAllColumnHeaders(collection, selector);

    for (var i = 0; i < collection.length; i++) {
      var row$ = $('<tr/>');
      for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var cellValue = collection[i][columns[colIndex]];
        if (cellValue == null) cellValue = "";
        row$.append($('<td/>').html(cellValue));
      }
      $(selector).append(row$);
    }
  }

  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records.
  function addAllColumnHeaders(collection, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < collection.length; i++) {
      var rowHash = collection[i];
      for (var key in rowHash) {
        if ($.inArray(key, columnSet) == -1) {
          columnSet.push(key);
          headerTr$.append($('<th/>').html(key));
        }
      }
    }
    $(selector).append(headerTr$);

    return columnSet;
  }

  function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: false } )
  }

  function showInfo(data, tabletop) {

    $("#blackMetalName").text(data[Object.keys(data)[0]].name);
    buildHtmlTable(data[Object.keys(data)[0]].elements, "#blackMetal");

    $("#otherMetalName").text(data[Object.keys(data)[1]].name);
    buildHtmlTable(data[Object.keys(data)[1]].elements, "#otherMetal");

    $("#sand").text(data[Object.keys(data)[2]].name);
    buildHtmlTable(data[Object.keys(data)[2]].elements, "#sand");

  }

  window.addEventListener('DOMContentLoaded', init)

})(jQuery);
