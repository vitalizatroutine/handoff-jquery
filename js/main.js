var handoff = {
    options: {
        selectors: {
            previewContainer: '.preview',
            renderContainer: '#preview'
        }
    },
    init: function(develop) {
        var options = this.options,
            selectors = options.selectors;

        this.pluginsInit();
        this.initPreview(selectors.previewContainer);

        if (develop) {
            this._renderSampleData(selectors.renderContainer,data);
        }
    },
    pluginsInit: function() {
        // Avoid `console` errors in browsers that lack a console.
        (function() {
            var method;
            var noop = function () {};
            var methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
            ];
            var length = methods.length;
            var console = (window.console = window.console || {});

            while (length--) {
                method = methods[length];

                // Only stub undefined methods.
                if (!console[method]) {
                    console[method] = noop;
                }
            }
        }());
    },
    initPreview: function(selector) {
        var $preview = $(selector);

        $preview.on('click', '.preview_toggle', function() {
            $preview.toggleClass('preview--open');
        });
    },
    _renderSampleData: function(selector, data) {
        var $preview = $(selector);

        $preview.html(Mustache.render(templates.handoff, data));
    }
};

handoff.init(true);
