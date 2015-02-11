/*jQWidgets v3.5.1 (2014-Nov-17)Copyright (c) 2011-2014 jQWidgets.License: http://jqwidgets.com/license/*/(function(a){a.jqx.jqxWidget("jqxComplexInput","",{});a.extend(a.jqx._jqxComplexInput.prototype,{defineInstance:function(){var b={width:null,height:null,value:"",placeHolder:"",roundedCorners:true,disabled:false,rtl:false,events:["change"]};a.extend(true,this,b)},createInstance:function(){var b=this;b._allowedCharacters=new RegExp(/([\+\-\.0-9i])/i);b.render()},render:function(){var b=this;b._addClasses();b._setSize();b._removeHandlers();b._addHandlers();b.element.value=b.value;b._refreshPlaceHolder()},refresh:function(b){if(b!==true){this.render()}},destroy:function(){var b=this;b._removeHandlers();b.host.destroy()},val:function(e){var d=this;if(typeof e==="string"||typeof e==="object"&&a.isEmptyObject(e)===false){var g,c;if(typeof e==="string"){g=d.getReal(e);c=d.getImaginary(e)}else{if(typeof e==="object"&&a.isEmptyObject(e)===false){g=e.real;c=e.imaginary}}var b=c>=0?"+":"-";var f=g+" "+b+" "+Math.abs(c)+"i";if(f!==d.element.value){d.element.value=f;d._onChange(d.value)}}else{return d.element.value}},getReal:function(f){if(!f||(typeof f==="object"&&a.isEmptyObject(f)===true)){f=this.element.value}var c=a.trim(f),e="";if((f.match(/i/g)||[]).length===0){return parseFloat(c)}if(f.charAt(0)==="+"){c=c.slice(1,f.length)}else{if(f.charAt(0)==="-"){c=c.slice(1,f.length);e="-"}}function g(h){c=c.slice(0,h);c=a.trim(c);return parseFloat(e+""+c)}var b=c.indexOf("+");if(b!==-1){return g(b)}var d=c.indexOf("-");if(d!==-1){return g(d)}return 0},getImaginary:function(f){if(!f||(typeof f==="object"&&a.isEmptyObject(f)===true)){f=this.element.value}if((f.match(/i/g)||[]).length===0){return 0}var e=a.trim(f),d="";if(e.charAt(0)==="-"||e.charAt(0)==="+"){d=e.charAt(0)==="-"?"-":"+";e=a.trim(e.slice(1,f.length))}function g(i,h){e=e.slice(i+1,e.indexOf("i"));e=a.trim(e);if(e===""){e=1}return parseFloat(h+""+e)}var b=e.indexOf("+");if(b!==-1){return g(b,"+")}var c=e.indexOf("-");if(c!==-1){return g(c,"-")}e=d+""+e.slice(0,e.indexOf("i"));if(e===""||e==="+"){return 1}else{if(e==="-"){return -1}else{return parseFloat(e)}}},propertyChangedHandler:function(b,c,e,d){if(d!==e){switch(c){case"width":b.host.width(d);break;case"height":b.host.height(d);if(a.jqx.browser.msie&&a.jqx.browser.version<9){b.host.css("line-height",b.host.height()+"px")}break;case"value":b.element.value=d;b._onChange(e);break;case"placeHolder":b._refreshPlaceHolder(e);break;case"roundedCorners":if(d===true){b.host.addClass(b.toThemeProperty("jqx-rc-all"))}else{b.host.removeClass(b.toThemeProperty("jqx-rc-all"))}break;case"disabled":if(d===true){b.host.attr("disabled",true);b.host.addClass(b.toThemeProperty("jqx-fill-state-disabled jqx-input-disabled"))}else{b.host.removeAttr("disabled");b.host.removeClass(b.toThemeProperty("jqx-fill-state-disabled jqx-input-disabled"))}break;case"rtl":if(d===true){b.host.addClass(b.toThemeProperty("jqx-complex-input-rtl"))}else{b.host.removeClass(b.toThemeProperty("jqx-complex-input-rtl"))}break}}},_raiseEvent:function(f,c){if(c===undefined){c={owner:null}}var d=this.events[f];c.owner=this;var e=new a.Event(d);e.owner=this;e.args=c;if(e.preventDefault){e.preventDefault()}var b=this.host.trigger(e);return b},_addClasses:function(){var b=this;b.host.addClass(b.toThemeProperty("jqx-widget jqx-input jqx-complex-input"));if(b.roundedCorners===true){b.host.addClass(b.toThemeProperty("jqx-rc-all"))}if(b.disabled===true){b.host.attr("disabled",true);b.host.addClass(b.toThemeProperty("jqx-fill-state-disabled jqx-input-disabled"))}if(b.rtl===true){b.host.addClass(b.toThemeProperty("jqx-complex-input-rtl"))}},_refreshPlaceHolder:function(c){var b=this;if("placeholder" in b.element){b.host.attr("placeHolder",b.placeHolder)}else{if(b.element.value===""||b.element.value===c){b.element.value=b.placeHolder}}},_setSize:function(){var b=this;b.host.width(b.width);b.host.height(b.height);if(a.jqx.browser.msie&&a.jqx.browser.version<9){b.host.css("line-height",b.host.height()+"px");a.jqx.utilities.resize(b.host,function(){if(typeof b.height==="string"&&b.height.charAt(b.height.length-1)==="%"){b.host.css("line-height",b.host.height()+"px")}})}},_addHandlers:function(){var c=this;var d=c.element.id;var b=[8,9,13,32,35,36,37,38,39,40,46];c.addHandler(c.host,"focus.jqxComplexInput"+d,function(){c.host.addClass(c.toThemeProperty("jqx-fill-state-focus"));if(!("placeholder" in c.element)&&(c.element.value===c.placeHolder)){c.element.value=""}});c.addHandler(c.host,"blur.jqxComplexInput"+d,function(){c.host.removeClass(c.toThemeProperty("jqx-fill-state-focus"));if(c.element.value!==c.value||(("placeholder" in c.element)||(!("placeholder" in c.element)&&c.element.value===""))){c._onChange(c.value)}if(!("placeholder" in c.element)&&(c.element.value===""||c.element.value===c.placeHolder)){c.element.value=c.placeHolder}});c.addHandler(c.host,"keydown.jqxComplexInput"+d,function(g){var h=!g.charCode?g.which:g.charCode;if(g.ctrlKey===true&&(h===67||h===86||h===88)){return}var f=String.fromCharCode(h);if(h===187&&g.shiftKey===true){f="+"}else{if(h===189&&g.shiftKey===false){f="-"}else{if(h===190&&g.shiftKey===false){f="."}}}var j=c._allowedCharacters.test(f);if(j===true){if(f==="+"||f==="-"){var e=(c.element.value.match(/-/g)||[]).length+(c.element.value.match(/\+/g)||[]).length;if(e>1){return false}}else{if(f==="."){var i=(c.element.value.match(/\./g)||[]).length;if(i>1){return false}}else{if(f.toLowerCase()==="i"){if(c.element.value.indexOf(f.toLowerCase())!==-1){return false}}}}}else{if(b.indexOf(h)!==-1){return}else{return false}}});c.addHandler(c.host,"keypress.jqxComplexInput"+d,function(e){var f=!e.charCode?e.which:e.charCode;if(f===13){if(c.element.value!==c.value){c._onChange(c.value)}}})},_removeHandlers:function(){var b=this;var c=b.element.id;b.removeHandler(b.host,"focus.jqxComplexInput"+c);b.removeHandler(b.host,"blur.jqxComplexInput"+c);b.removeHandler(b.host,"keydown.jqxComplexInput"+c);b.removeHandler(b.host,"keypress.jqxComplexInput"+c)},_onChange:function(c){var l=this,k,o;var n=l.element.value;if(a.trim(n)!==""&&a.trim(n)!==l.placeHolder){if(n.indexOf("++")!==-1||n.indexOf("+-")!==-1){var f=n.indexOf("+");n=n.slice(0,f+1)+""+n.slice(f+2,n.length)}else{if(n.indexOf("--")!==-1||n.indexOf("-+")!==-1){var j=n.indexOf("-");n=n.slice(0,j+1)+""+n.slice(j+2,n.length)}}if(n.indexOf("..")!==-1){var d=n.indexOf(".");n=n.slice(0,d+1)+""+n.slice(d+2,n.length)}var m=l.getReal(n);var g=l.getImaginary(n);var b=" ";var e=g>=0?"+":"-";var h="i";k=m;o=g;if(isNaN(k)||isNaN(o)){l.element.value=c;return}if(m===0){m="";b="";if(e==="+"){e=""}}if(g===-1||g===0||g===1){if(g===0){b="";e="";h=""}g=""}else{g=Math.abs(g)}l.element.value=m+""+b+""+e+""+b+""+g+""+h;l.value=l.element.value}else{k=0;o=0;l.value=""}if(l.value!==c){l._raiseEvent("0",{value:l.value,oldValue:c,realPart:k,imaginaryPart:o})}}})})(jqxBaseFramework);