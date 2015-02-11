/*
jQWidgets v3.5.1 (2014-Nov-17)
Copyright (c) 2011-2014 jQWidgets.
License: http://jqwidgets.com/license/
*/
(function ($) {
    'use strict';

    $.jqx.jqxWidget('jqxComplexInput', '', {});

    $.extend($.jqx._jqxComplexInput.prototype, {
        defineInstance: function () {
            var settings = {
                // properties
                width: null,
                height: null,
                value: '',
                placeHolder: '',
                roundedCorners: true,
                disabled: false,
                rtl: false,

                // events
                events: ['change']
            };
            $.extend(true, this, settings);
        },

        createInstance: function () {
            var that = this;

            that._allowedCharacters = new RegExp(/([\+\-\.0-9i])/i);
            that.render();
        },

        // renders the widget
        render: function () {
            var that = this;

            // adds the necessary classes for the widget
            that._addClasses();

            // set the width and height of the widget
            that._setSize();

            // removes event handlers
            that._removeHandlers();

            // adds event handlers
            that._addHandlers();

            that.element.value = that.value;

            // sets the input's placeholder
            that._refreshPlaceHolder();
        },

        // refreshes the widget
        refresh: function (initialRefresh) {
            if (initialRefresh !== true) {
                this.render();
            }
        },

        // destroys the widget
        destroy: function () {
            var that = this;

            that._removeHandlers();
            that.host.destroy();
        },

        // gets or sets the complex number
        val: function (value) {
            var that = this;

            if (typeof value === 'string' || typeof value === 'object' && $.isEmptyObject(value) === false) {
                var real, imaginary;

                if (typeof value === 'string') {
                    real = that.getReal(value);
                    imaginary = that.getImaginary(value);
                } else if (typeof value === 'object' && $.isEmptyObject(value) === false) {
                    real = value.real;
                    imaginary = value.imaginary;
                }

                var sign = imaginary >= 0 ? '+' : '-';
                var newValue = real + ' ' + sign + ' ' + Math.abs(imaginary) + 'i';
                if (newValue !== that.element.value) {
                    that.element.value = newValue;
                    that._onChange(that.value);
                }
            } else {
                return that.element.value;
            }
        },

        // gets the real part of the complex number
        getReal: function (value) {
            if (!value || (typeof value === 'object' && $.isEmptyObject(value) === true)) {
                value = this.element.value;
            }

            var realPart = $.trim(value), minus = '';

            if ((value.match(/i/g) || []).length === 0) {
                return parseFloat(realPart);
            }

            if (value.charAt(0) === '+') {
                realPart = realPart.slice(1, value.length);
            } else if (value.charAt(0) === '-') {
                realPart = realPart.slice(1, value.length);
                minus = '-';
            }

            function slice(index) {
                realPart = realPart.slice(0, index);
                realPart = $.trim(realPart);
                return parseFloat(minus + '' + realPart);
            }

            var plusIndex = realPart.indexOf('+');
            if (plusIndex !== -1) {
                return slice(plusIndex);
            }
            var minusIndex = realPart.indexOf('-');
            if (minusIndex !== -1) {
                return slice(minusIndex);
            }
            return 0;
        },

        // gets the imaginary part of the complex number
        getImaginary: function (value) {
            if (!value || (typeof value === 'object' && $.isEmptyObject(value) === true)) {
                value = this.element.value;
            }

            if ((value.match(/i/g) || []).length === 0) {
                return 0;
            }

            var imaginaryPart = $.trim(value), minus = '';

            if (imaginaryPart.charAt(0) === '-' || imaginaryPart.charAt(0) === '+') {
                minus = imaginaryPart.charAt(0) === '-' ? '-' : '+';
                imaginaryPart = $.trim(imaginaryPart.slice(1, value.length));
            }

            function slice(index, sign) {
                imaginaryPart = imaginaryPart.slice(index + 1, imaginaryPart.indexOf('i'));
                imaginaryPart = $.trim(imaginaryPart);
                if (imaginaryPart === '') {
                    imaginaryPart = 1;
                }
                return parseFloat(sign + '' + imaginaryPart);
            }

            var plusIndex = imaginaryPart.indexOf('+');
            if (plusIndex !== -1) {
                return slice(plusIndex, '+');
            }
            var minusIndex = imaginaryPart.indexOf('-');
            if (minusIndex !== -1) {
                return slice(minusIndex, '-');
            }
            imaginaryPart = minus + '' + imaginaryPart.slice(0, imaginaryPart.indexOf('i'));
            if (imaginaryPart === '' || imaginaryPart === '+') {
                return 1;
            } else if (imaginaryPart === '-') {
                return -1;
            } else {
                return parseFloat(imaginaryPart);
            }
        },

        propertyChangedHandler: function (object, key, oldvalue, value) {
            if (value !== oldvalue) {
                switch (key) {
                    case 'width':
                        object.host.width(value);
                        break;
                    case 'height':
                        object.host.height(value);
                        if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
                            object.host.css('line-height', object.host.height() + 'px');
                        }
                        break;
                    case 'value':
                        object.element.value = value;
                        object._onChange(oldvalue);
                        break;
                    case 'placeHolder':
                        object._refreshPlaceHolder(oldvalue);
                        break;
                    case 'roundedCorners':
                        if (value === true) {
                            object.host.addClass(object.toThemeProperty('jqx-rc-all'));
                        } else {
                            object.host.removeClass(object.toThemeProperty('jqx-rc-all'));
                        }
                        break;
                    case 'disabled':
                        if (value === true) {
                            object.host.attr('disabled', true);
                            object.host.addClass(object.toThemeProperty('jqx-fill-state-disabled jqx-input-disabled'));
                        } else {
                            object.host.removeAttr('disabled');
                            object.host.removeClass(object.toThemeProperty('jqx-fill-state-disabled jqx-input-disabled'));
                        }
                        break;
                    case 'rtl':
                        if (value === true) {
                            object.host.addClass(object.toThemeProperty('jqx-complex-input-rtl'));
                        } else {
                            object.host.removeClass(object.toThemeProperty('jqx-complex-input-rtl'));
                        }
                        break;
                }
            }
        },

        // raises an event
        _raiseEvent: function (id, arg) {
            if (arg === undefined) {
                arg = { owner: null };
            }

            var evt = this.events[id];
            arg.owner = this;

            var event = new $.Event(evt);
            event.owner = this;
            event.args = arg;
            if (event.preventDefault) {
                event.preventDefault();
            }

            var result = this.host.trigger(event);
            return result;
        },

        // adds the necessary classes for the widget
        _addClasses: function () {
            var that = this;

            that.host.addClass(that.toThemeProperty('jqx-widget jqx-input jqx-complex-input'));

            if (that.roundedCorners === true) {
                that.host.addClass(that.toThemeProperty('jqx-rc-all'));
            }

            if (that.disabled === true) {
                that.host.attr('disabled', true);
                that.host.addClass(that.toThemeProperty('jqx-fill-state-disabled jqx-input-disabled'));
            }

            if (that.rtl === true) {
                that.host.addClass(that.toThemeProperty('jqx-complex-input-rtl'));
            }
        },

        // sets the input's placeholder
        _refreshPlaceHolder: function (oldPlaceHolder) {
            var that = this;

            if ('placeholder' in that.element) {
                that.host.attr('placeHolder', that.placeHolder);
            } else {
                if (that.element.value === '' || that.element.value === oldPlaceHolder) {
                    that.element.value = that.placeHolder;
                }
            }
        },

        // set the width and height of the widget
        _setSize: function () {
            var that = this;

            that.host.width(that.width);
            that.host.height(that.height);

            if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
                that.host.css('line-height', that.host.height() + 'px');

                $.jqx.utilities.resize(that.host, function () {
                    if (typeof that.height === 'string' && that.height.charAt(that.height.length - 1) === '%') {
                        that.host.css('line-height', that.host.height() + 'px');
                    }
                });
            }
        },

        // adds event handlers
        _addHandlers: function () {
            var that = this;
            var id = that.element.id;
            var specialCharacters = [8, 9, 13, 32, 35, 36, 37, 38, 39, 40, 46]; // backspace, tab, enter, space, end, home, left arrow, up arrow, right arrow, down arrow, delete

            that.addHandler(that.host, 'focus.jqxComplexInput' + id, function () {
                that.host.addClass(that.toThemeProperty('jqx-fill-state-focus'));

                if (!('placeholder' in that.element) && (that.element.value === that.placeHolder)) {
                    that.element.value = '';
                }
            });
            that.addHandler(that.host, 'blur.jqxComplexInput' + id, function () {
                that.host.removeClass(that.toThemeProperty('jqx-fill-state-focus'));

                if (that.element.value !== that.value || (('placeholder' in that.element) || (!('placeholder' in that.element) && that.element.value === ''))) {
                    that._onChange(that.value);
                }

                if (!('placeholder' in that.element) && (that.element.value === '' || that.element.value === that.placeHolder)) {
                    that.element.value = that.placeHolder;
                }
            });
            that.addHandler(that.host, 'keydown.jqxComplexInput' + id, function (event) {
                var keyCode = !event.charCode ? event.which : event.charCode;

                // Ctrl + C (Copy), Ctrl + V (Paste) and Ctrl + X (Cut) support
                if (event.ctrlKey === true && (keyCode === 67 || keyCode === 86 || keyCode === 88)) {
                    return;
                }

                var key = String.fromCharCode(keyCode);
                if (keyCode === 187 && event.shiftKey === true) {
                    key = '+';
                } else if (keyCode === 189 && event.shiftKey === false) {
                    key = '-';
                } else if (keyCode === 190 && event.shiftKey === false) {
                    key = '.';
                }

                var test = that._allowedCharacters.test(key);
                if (test === true) { // test for allowed characters (numbers from 0 to 9, +, - and i)
                    if (key === '+' || key === '-') {
                        var numberOfSigns = (that.element.value.match(/-/g) || []).length + (that.element.value.match(/\+/g) || []).length;
                        if (numberOfSigns > 1) { // no more than two sign characters (+ or -) are allowed
                            return false;
                        }
                    } else if (key === '.') {
                        var numberOfDecSeparators = (that.element.value.match(/\./g) || []).length;
                        if (numberOfDecSeparators > 1) { // no more than two decimal separator characters (.) are allowed
                            return false;
                        }
                    } else if (key.toLowerCase() === 'i') { // no more than one i character is allowed
                        if (that.element.value.indexOf(key.toLowerCase()) !== -1) {
                            return false;
                        }
                    }
                } else if (specialCharacters.indexOf(keyCode) !== -1) {
                    return;
                } else {
                    return false;
                }
            });
            that.addHandler(that.host, 'keypress.jqxComplexInput' + id, function (event) {
                var keyCode = !event.charCode ? event.which : event.charCode;
                if (keyCode === 13) {
                    if (that.element.value !== that.value) {
                        that._onChange(that.value);
                    }
                }
            });
        },

        // removes event handlers
        _removeHandlers: function () {
            var that = this;
            var id = that.element.id;

            that.removeHandler(that.host, 'focus.jqxComplexInput' + id);
            that.removeHandler(that.host, 'blur.jqxComplexInput' + id);
            that.removeHandler(that.host, 'keydown.jqxComplexInput' + id);
            that.removeHandler(that.host, 'keypress.jqxComplexInput' + id);
        },

        // change event handler
        _onChange: function (oldValue) {
            var that = this, realValue, imaginaryValue;

            var value = that.element.value;

            if ($.trim(value) !== '' && $.trim(value) !== that.placeHolder) {
                // validation for double plus/minus/decimal separator
                if (value.indexOf('++') !== -1 || value.indexOf('+-') !== -1) {
                    var plusIndex = value.indexOf('+');
                    value = value.slice(0, plusIndex + 1) + '' + value.slice(plusIndex + 2, value.length);
                } else if (value.indexOf('--') !== -1 || value.indexOf('-+') !== -1) {
                    var minusIndex = value.indexOf('-');
                    value = value.slice(0, minusIndex + 1) + '' + value.slice(minusIndex + 2, value.length);
                }
                if (value.indexOf('..') !== -1) {
                    var decimalSeparatorIndex = value.indexOf('.');
                    value = value.slice(0, decimalSeparatorIndex + 1) + '' + value.slice(decimalSeparatorIndex + 2, value.length);
                }

                var real = that.getReal(value);
                var imaginary = that.getImaginary(value);
                var space = ' ';
                var sign = imaginary >= 0 ? '+' : '-';
                var i = 'i';

                realValue = real;
                imaginaryValue = imaginary;

                // NaN validation
                if (isNaN(realValue) || isNaN(imaginaryValue)) {
                    that.element.value = oldValue;
                    return;
                }

                if (real === 0) {
                    real = '';
                    space = '';
                    if (sign === '+') {
                        sign = '';
                    }
                }

                if (imaginary === -1 || imaginary === 0 || imaginary === 1) {
                    if (imaginary === 0) {
                        space = '';
                        sign = '';
                        i = '';
                    }
                    imaginary = '';
                } else {
                    imaginary = Math.abs(imaginary);
                }

                that.element.value = real + '' + space + '' + sign + '' + space + '' + imaginary + '' + i;
                that.value = that.element.value;
            } else {
                realValue = 0;
                imaginaryValue = 0;
                that.value = '';
            }

            if (that.value !== oldValue) {
                that._raiseEvent('0', { 'value': that.value, 'oldValue': oldValue, 'realPart': realValue, 'imaginaryPart': imaginaryValue }); // change event
            }
        }
    });
})(jqxBaseFramework);