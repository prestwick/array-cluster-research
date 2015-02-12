/*global $, document, console */

$(document).ready(function () {
    'use strict';
    var sliderCtl = $('.sliderCtl').jqxSlider(),
        numericCtl = $('.numericCtl').jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true }),
        stringCtl = $('.stringCtl').jqxInput({placeHolder: 'Placeholder Text', height: 25, width: 200, minLength: 1}),
        dataGrid = $('#dataGrid'),
        addWidget = $('#addWidget').jqxButton({width: '150'}),
        removeWidget = $('#removeWidget').jqxButton({width: '150'}),
        addRowButton = $('#addRowButton').jqxButton({width: '150'}),
        removeRowButton = $('#removeRowButton').jqxButton({width: '150'}),
        dataAdapter,
        data = [0, 0, 0, 0],
        source,
        cellRenderer;
    
    source = {
        localdata: data,
        datatype: 'array'
    };
    
    cellRenderer = function () {
        return $('.cluster').html();
    };
    
    dataAdapter = new $.jqx.dataAdapter(source, {});
    
    dataGrid.jqxGrid({
        width: 350,
        source: dataAdapter,
        columns : [
            {text: 'column', datafield: 'column', width: 350, cellsrenderer: cellRenderer}
        ],
        rowsheight: 150,
        autoheight: true,
        rendered: function () {
            //there are cases where there may be no sliders present. 
            try {
                sliderCtl = $('.sliderCtl').jqxSlider();
            } catch (err) {
                console.log(err);
            }
            numericCtl = $('.numericCtl').jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true });
            stringCtl = $('.stringCtl').jqxInput({placeHolder: 'Placeholder Text', height: 25, width: 200, minLength: 1});
        }
    });

    addWidget.on('click', function () {
        var sliderHtml = '<div class="sliderCtl"></div>';
        $('.cluster').prepend(sliderHtml);
        dataGrid.jqxGrid('render');
    });
    
    removeWidget.on('click', function () {
        //remove the slider widget
        sliderCtl.remove();
        dataGrid.jqxGrid('render');
    });
    
    addRowButton.on('click', function () {
        dataGrid.jqxGrid('addrow', null, {});
    });
    
    removeRowButton.on('click', function () {
        dataGrid.jqxGrid('deleterow', dataGrid.jqxGrid('getrows').length - 1);
    });
});
//what if we want to add or remove an element of the cluster - Done
//what if we have nested clusters
//how would we build this up dynamically. 