//  ----------------------------------------------------
//     Jquery Mini Chart Plugin
//     Code By Paul Goddard (Nukeem)
//     Copyright 2012 Paul Goddard
//  ----------------------------------------------------
(function($) {
    $.fn.extend({

        miniPie: function(options) {

            var defaults = {
                width: '170px',
                height: '180px',
                origin: 270,
                radius: 55,
                x: 90,
                y: 90,
                markers: 20,
                markerWidth: 2,
                markerColor: '#aaa',
                markerCap: 'square',
                markerGap: 10,
                pieWidth: 5,
                pieBgColor: '#eee',
                pieColor: '#c00',
                pieCap: 'round',
                showPercent: true,
                showActual: false,
                valueFont: 'normal 20px century gothic',
                valueFontColor: '#999',
                captionFont: 'normal 14px century gothic',
                captionFontColor: '#999',
                precision: 0
            };
            var opt = $.extend(defaults, options);

            return this.each(function() {
                var cr = function(d) {
                    return d * (Math.PI / 180);
                },
                    cv = document.createElement("canvas"),
                    p = ($(this).data("actual") / $(this).data("total")) * 100,
                    s = cr(p * 3.6),
                    o = cr(opt.origin),
                    c = cv.getContext('2d');

                cv.setAttribute("width", opt.width);
                cv.setAttribute("height", opt.height);
                
                c.lineWidth = opt.markerWidth;
                c.lineCap = opt.markerCap;
                for (i = 0; i < opt.markers; i++) {
                    var l = cr((360 / opt.markers) * i);
                    c.beginPath();
                    c.arc(opt.x, opt.y, opt.radius + (opt.markerGap), o + l, o + (l + 0.001));
                    c.strokeStyle = opt.markerColor;
                    c.stroke();
                    c.closePath();
                }

                c.lineWidth = opt.pieWidth;
                c.lineCap = opt.pieCap;
                c.beginPath();
                c.arc(opt.x, opt.y, opt.radius, 0, 10);
                c.strokeStyle = opt.pieBgColor;
                c.stroke();
                c.closePath();

                c.beginPath();
                c.arc(opt.x, opt.y, opt.radius, o, o + s);
                c.strokeStyle = opt.pieColor;
                c.stroke();
                c.closePath();

                if (opt.showPercent) {
                    c.beginPath();
                    c.fillStyle = opt.valueFontColor;
                    c.textAlign = "center";
                    c.textBaseline = "middle";
                    c.font = opt.valueFont;
                    c.fillText(p.toFixed(opt.precision) + "%", opt.x, opt.y);
                    c.closePath();
                }
                
                if (opt.showActual) {
                    c.beginPath();
                    c.fillStyle = opt.valueFontColor;
                    c.textAlign = "center";
                    c.textBaseline = "middle";
                    c.font = opt.valueFont;
                    c.fillText($(this).data("actual"), opt.x, opt.y);
                    c.closePath();
                }

                if ($(this).data("caption")) {
                    c.beginPath();
                    c.fillStyle = opt.captionFontColor;
                    c.textAlign = "center";
                    c.textBaseline = "middle";
                    c.font = opt.captionFont;
                    c.fillText($(this).data("caption"), opt.x, (opt.y + (opt.radius))+20);
                    c.closePath();
                }
                
                $(this).append(cv);
            });
        }
    });
})(jQuery);