/*global $, document */

$(document).ready(function () {
    'use strict';
    var sliderCtl,
        numericCtl,
        stringCtl,
        dataGrid = $('#dataGrid'),
        dataAdapter,
        data = [0, 0, 0, 0],
        source,
        rowHtml,
        cellRenderer;
    
    source = {
        localdata: data,
        datatype: 'array'
    };
    
    cellRenderer = function () {
//        return '<div class="cluster">' +
//                '<div class="sliderCtl"></div>' +
//                '<div class="numericCtl"></div>' +
//                '<input type="text" class="stringCtl"/>' +
//                '</div>';
        return $('.cluster').html();
    };
    
    dataAdapter = new $.jqx.dataAdapter(source, {});
    
    dataGrid.jqxGrid({
        width: 350,
        source: dataAdapter,
        columns : [
            {text: 'column', datafield: 'column', width: 350, cellsrenderer: cellRenderer}
        ],
        rowsheight: 100,
        autoheight: true
    });
    sliderCtl = $('.sliderCtl').jqxSlider();
    numericCtl = $('.numericCtl').jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true });
    stringCtl = $('.stringCtl').jqxInput({placeHolder: 'Placeholder Text', height: 25, width: 200, minLength: 1});
});
//what if we want to add or remove an element of the cluster
//what if we have nested clusters
//how would we build this up dynamically. 