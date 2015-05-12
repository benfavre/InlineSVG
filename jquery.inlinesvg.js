/*!
 * jquery.inlinesvg
 *
 * @license MIT
 * @version: 1.1.0
 * @see {@link https://github.com/createlogic/InlineSVG|GitHub}
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2010-2015 Bilal Niaz Awan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ($) {
    $.fn.inlineSVG = function (options) {

        options = $.extend({
            eachAfter: null,
            allAfter: null,
            replacedClass: 'replaced-svg'
        }, (options || {}));

        var $list = this;
        var counter = 0;

        return $list.each(function () {

            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');
                var classes = [];

                // Add replaced image's ID to the new SVG
                if (imgID) {
                    $svg.attr('id', imgID);
                }

                // Add replaced image's classes to the new SVG
                if (imgClass) {
                    classes.push(imgClass);
                }
                if (options.replacedClass) {
                    classes.push(options.replacedClass);
                }
                $svg.attr('class', classes.join(' '));

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

                // Callback for each element
                options.eachAfter && options.eachAfter.call($svg.get(0));

                // Check for all is completed
                if (++counter === $list.length) {
                    options.allAfter && options.allAfter.call(null);
                }

            }, 'xml');

        });
    };
})(jQuery);
