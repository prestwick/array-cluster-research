/*global $, document, console */

// This demonstrates how an array of clusters can be composed using a template HTML cluster and the jqxGrid. 
// All manipulation of the cluster within the grid occures in a hidden <div> that represents the cluster. 
// Only the widgets within the cluster within the grid are initialized. 

$(document).ready(function () {
    'use strict';
    
    // Setup scope variables
    var source,
        dataAdapter,
        data = [0, 0, 0, 0],
        cellRenderer,
        dataGrid = $('#dataGrid'),
        clusterTemplate = $('.cluster-template'),
        addWidget = $('#addWidget').jqxButton({width: '150'}),
        removeWidget = $('#removeWidget').jqxButton({width: '150'}),
        addRowButton = $('#addRowButton').jqxButton({width: '150'}),
        removeRowButton = $('#removeRowButton').jqxButton({width: '150'});
        
    // Setup source object for jqx data adapter
    source = {
        localdata: data,
        datatype: 'array'
    };
    dataAdapter = new $.jqx.dataAdapter(source, {});
    
    
    /**     * Function to populate each grid (array) cell with the HTML of the cluster of widgets.
            * @returns {html} Grid cell HTML     
    */
    cellRenderer = function () {
        console.log('cell render called');
        return clusterTemplate.html();
    };
    
    // Setup dataGrid
    dataGrid.jqxGrid({
        width: 300,
        source: dataAdapter,
        
        // Create a single column who uses the cellRenderer function to render each grid cell. 
        columns : [
            {text: 'column', datafield: 'column', width: 300, cellsrenderer: cellRenderer}
        ],
        rowsheight: 150,
        autoheight: true,
        
        // Rendered function initializes the jqxWidgets from the raw cluster HTML. 
        // Try catch is required since this can be called before cluster HTML is inserted into each cell.  
        rendered: function () {
            console.log('rendered called');
            try {
                dataGrid.find('.sliderCtl').jqxSlider();
            } catch (errSliderRender) {
                console.log(errSliderRender);
            }
            try {
                dataGrid.find('.stringCtl').jqxInput({placeHolder: 'Placeholder Text', height: 25, width: 200, minLength: 1});
            } catch (errStringRender) {
                console.log(errStringRender);
            }
            try {
                dataGrid.find('.numericCtl').jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true });
            } catch (errNumericRender) {
                console.log(errNumericRender);
            }
        }
    });

    // Button to add additional sliders to the cluster HTML
    addWidget.on('click', function () {
        var sliderHtml = '<div class="sliderCtl"></div>';
        clusterTemplate.prepend(sliderHtml);
        dataGrid.jqxGrid('render');
    });
    
    // Button to remove all slider widgets from the cluster HTML
    removeWidget.on('click', function () {
        clusterTemplate.find('.sliderCtl').remove();
        dataGrid.jqxGrid('render');
    });
    
    // Add a row to the data grid (array)
    addRowButton.on('click', function () {
        dataGrid.jqxGrid('addrow', null, {});
        dataGrid.jqxGrid('render');
    });
    
    // Removes the button row of the data grid (array)
    removeRowButton.on('click', function () {
        dataGrid.jqxGrid('deleterow', dataGrid.jqxGrid('getrows').length - 1);
        dataGrid.jqxGrid('render');
    });
});