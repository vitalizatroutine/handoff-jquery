var handoff = {
    develop: false,

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
            lists: '.field--list',
            pastebin: 'pastebin',
            previewButton: '#toggle_preview',
            copyButton: '#copy',
            generateButton: '#generate'
        }
    },

    init: function(develop) {
        var inst = this,
            options = inst.options,
            selectors = options.selectors;

        inst.initPlugins();
        inst.initPreview($(selectors.previewContainer), $(selectors.previewButton));
        inst.initLists(selectors.lists);
        inst.initItemSubmit(selectors.pastebin);
        inst.initGenerate(selectors.generateButton);

        if (develop || this.develop) {
            inst._renderSampleData(selectors.renderContainer, data);
        }
    },
    initPlugins: function() {
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
    initPreview: function($preview, $toggle) {
        $toggle.on('click', function() {
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
                if (event.key !== "Enter") {
                    return;
                }

                var $this = $(this),
                    target = $this.data('target'),
                    value = $this.val().trim();

                if (!value || !value.length) {
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

    initItemSubmit: function(selector) {
        var inst = this,
            _pastebin = document.getElementById(selector);

        _pastebin.addEventListener('paste', function(event) {
            inst.onItemSubmit(event);
        });
    },
    onItemSubmit: function(event) {
        var inst = this,
            pastedData = event.clipboardData.getData('text/html'),
            html = inst._cleanPaste(pastedData);
            data = inst._mapDOM(html || {});

        inst._changeState({items: data}, function(state) {
            inst.renderItems(state.items);
        });
    },
    renderItems: function(array) {
        $('#items').html(Mustache.render(templates['items'], array));
    },
    _cleanPaste: function(paste) {
        var regex = new RegExp('<input.*?>| id=".*?"| style=".*?"| onclick=".*?"| onmouseover=".*?"|<br>', 'g');
        return paste.replace(regex, '');
    },
    _mapDOM: function(html) {
        var document;

        if (window.DOMParser) {
            var parser = new DOMParser();
            document = parser.parseFromString(html, "text/xml");
        } else {
            document = new ActiveXObject("Microsoft.XMLDOM");
            document.async = false;
            document.loadXML(html);
        }

        return this._generateItems(document);
    },
    _generateItems: function(document) {
        var titleElements = document.getElementsByClassName('ToDoTitleContainer'),
            gridElements = document.getElementsByClassName('ToDoGrid'),
            data = [];

        for (i = 0; i < titleElements.length; i++) {
            data.push({
                title: this._getText(titleElements[i]),
                columns: this._getColumns(gridElements[i]) || [],
                rows: this._getRows(gridElements[i]) || []
            });
        }

        return data;
    },
    _getText: function(element) {
        return element && element.firstChild && element.firstChild.textContent || 'unavailable';
    },
    _getColumns: function(element) {
        var body = element && element.firstChild,
            header = body && body.firstChild,
            cells = header && header.childNodes,
            columns = [];

        if (cells && cells.length) {
            for (c = 1; c < cells.length - 1; c++) {
                var cell = cells[c];
                columns.push(cell.textContent);
            }
        }

        return columns;
    },
    _getRows: function(element) {
        var body = element && element.firstChild,
            items = body && body.childNodes,
            rows = [];

        if (items && items.length) {
            for (r = 1; r < items.length; r++) {
                var cells = items[r].childNodes;
                if (cells && cells.length) {
                    var rowData = [];
                    for (c = 1; c < cells.length - 1; c++) {
                        var cell = cells[c];
                        rowData.push(cell.textContent);
                    }
                    rows.push(rowData);
                }
            }
        }

        return rows;
    },

    initGenerate: function(selector) {
        var inst = this;

        $(selector).on('click', function() {
            inst.serializeData();
            inst.generatePreview(inst.options.selectors.renderContainer, inst.state);
        });
    },
    serializeData: function() {
        var data = {};

        $('form').serializeArray().forEach(function(item) {
            data[item.name] = item.value;
        });

        this._changeState({
            client: {
                name: data.client_name || 'Not Available',
                url: 'https://' + (data.client_link || 'q4sandbox') + '.s3.q4web.com',
                highAlert: data.client_highalert === 'on'
            },
            publish: {
                date: data.date || 'Not Available',
                time: data.time ? this._convertTime(data.time) : 'Not Available',
                docsRequired: data['documents-required'] === 'on',
                lockedFiles: data['locked-files'] === 'on',
                emailAlert: data.email
            }
        });
    },
    generatePreview: function(selector, data) {
        var $preview = $(selector);
        $preview.html(Mustache.render(templates.handoff, data));
    },

    _changeState: function(newState, callback) {
        var state = $.extend({}, this.state, newState);
        this.state = state;
        callback && callback(this.state);
    },
    _pushToState: function(target, value, callback) {
        var data = this.state[target];
        data.push(value);
        callback && callback(data);
    },
    _removeFromState: function(target, index, callback) {
        if (index < 0) {
            return;
        }
        this.state[target].splice(index, 1);
        callback(this.state[target]);
    },

    _convertTime: function(time) {
        var pieces = time.split(':'),
            hour = pieces[0],
            minutes = pieces[1];

        if (hour >= 12) {
            return parseInt(hour) === 12 ? hour + ':' + minutes + 'PM' : (hour - 12) + ':' + minutes + 'PM';
        } else {
            return parseInt(hour) === 0 ? 12 + ':' + minutes + 'AM' : hour + ':' + minutes + 'AM';
        }
    },

    _renderSampleData: function(selector, data) {
        this.generatePreview(selector, data);
    }
};
