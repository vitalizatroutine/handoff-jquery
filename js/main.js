var handoff = {
    state: {
        files: [],
        links: [],
        comments: []
    },

    options: {
        selectors: {
            previewContainer: '.preview',
            renderContainer: '#preview',
            filesContainer: '#files',
            linksContainer: '#links',
            commentsContainer: '#comments',
            lists: '.field--list'
        }
    },

    init: function(develop) {
        var inst = this,
            options = inst.options,
            selectors = options.selectors;

        inst.pluginsInit();
        inst.initPreview(selectors.previewContainer);
        inst.initLists(selectors.lists);

        if (develop) {
            inst._renderSampleData(selectors.renderContainer, data);
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

    initLists: function(selector) {
        var inst = this,
            $lists = $(selector);

        $lists
            .on('click', '.field_submit', function() {
                var $this = $(this),
                    $input = $this.prev(),
                    value = $input.val().trim(),
                    target = $this.data('target');

                if (!value || !value.length) {
                    return;
                }

                inst._pushToState(target, $input.val(), function(array) {
                    inst.renderList(target, array);
                });
            })
            .on('keyup', '.field_input', function(event) {
                var $this = $(this),
                    target = $this.data('target'),
                    value = $this.val().trim();

                if (event.key !== "Enter" || !value || !value.length) {
                    return;
                }

                inst._pushToState(target, value, function(array) {
                    inst.renderList(target, array);
                });
            })
            .on('click', '.field_delete', function() {
                var $this = $(this),
                    index = $this.parent().index(),
                    target = $this.data('target');

                inst._removeFromState(target, index, function(array) {
                    inst.renderList(target, array);
                });
            });
    },
    renderList: function(target, array) {
        $('#' + target).html(Mustache.render(templates[target], array)).next().val('');
    },

    _pushToState: function(target, value, callback) {
        var data = this.state[target];
        data.push(value);
        callback(data);
    },
    _removeFromState: function(target, index, callback) {
        if (index < 0) {
            return;
        }
        this.state[target].splice(index, 1);
        callback(this.state[target]);
    },

    _renderSampleData: function(selector, data) {
        var $preview = $(selector);

        $preview.html(Mustache.render(templates.handoff, data));
    }
};

handoff.init(true);
