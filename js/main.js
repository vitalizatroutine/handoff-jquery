var handoff = {
    develop: false,

    state: {
        items: [],
        files: [],
        links: [],
        comments: [],
        timers: [{
            client: 'Goldcorp',
            dateTime: '2018-05-21T14:00:00-04:00',
            ticket: 101234,
            id: 376861093969
        }, {
            client: 'Barrick Gold',
            dateTime: '2018-05-11T07:00:00-04:00',
            ticket: 101233,
            id: 666583948036
        }, {
            client: 'Test',
            dateTime: '2018-05-10T19:42:54-04:00',
            ticket: 101233,
            id: 725148931398
        }],
        intervals: []
    },

    options: {
        selectors: {
            tabs: '.tabs',
            previewContainer: '.preview',
            renderContainer: '#preview',
            filesContainer: '#files',
            linksContainer: '#links',
            commentsContainer: '#comments',
            lists: '.field--list',
            items: '#items',
            pastebin: 'pastebin',
            previewButton: '#toggle_preview',
            copyButton: '#copy',
            generateButton: '#generate',
            handoffTitle: '#handoff_title',
            timeMaster: '.time-master'
        },
        dateFormat: 'MMMM Do, YYYY h:mm:ssa'
    },

    init: function(develop) {
        var inst = this,
            options = inst.options,
            selectors = options.selectors;

        inst.initPlugins();
        inst.initHandoffGenerator();
        inst.initTimeMaster();

        if (develop || this.develop) {
            inst._renderSampleData(selectors.renderContainer, data);
        }

        if (window.location.hash) {
            inst.updateView(window.location.hash);
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

    initTabs: function($tabs) {
        var inst = this;

        $tabs.on('click', '.tabs_item', function() {
            var $this = $(this),
                location = $this.data('location');

            inst.updateView(location);
        });
    },

    initHandoffGenerator: function() {
        var inst = this,
            options = inst.options,
            selectors = options.selectors;

        inst.initPreview($(selectors.previewContainer), $(selectors.previewButton));
        inst.initCopy($(selectors.copyButton));
        inst.initTabs($(selectors.tabs));
        inst.initLists(selectors.lists);
        inst.initItems(selectors.items);
        inst.initItemSubmit(selectors.pastebin);
        inst.initGenerate(selectors.generateButton);
    },

    initPreview: function($preview, $toggle) {
        $toggle.on('click', function() {
            $preview.toggleClass('preview--open');
        });
    },

    initCopy: function($toggle) {
        $toggle.on('click', function() {
            var range = document.createRange();

            range.selectNode(document.getElementById('preview'));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('Copy');
            window.getSelection().removeAllRanges();
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

    initItems: function(selector) {
        var inst = this,
            $items = $(selector);

        $items.on('click', '.table_delete', function() {
            var state = inst.state,
                $this = $(this),
                itemIndex = $this.closest('table').index(),
                rowIndex = $this.closest('tr').index();

            inst._removeFromState({
                target: 'items',
                subTarget: state.items[itemIndex].rows
            }, rowIndex, function(array) {
                inst.renderItems(array);
            });
        });
    },
    initItemSubmit: function(selector) {
        var inst = this,
            _pastebin = document.getElementById(selector);

        _pastebin.addEventListener('paste', function(event) {
            _pastebin.classList.remove('field_input--error');
            inst.onItemSubmit(_pastebin, event);
        });
    },
    onItemSubmit: function(input, event) {
        var inst = this,
            pastedData = event.clipboardData.getData('text/html'),
            html = inst._cleanPaste(pastedData);
            data = inst._mapDOM(html || {});

        if (!data || !data.length) {
            input.classList.add('field_input--error');

            setTimeout(function() {
                input.value = null;
                input.blur();
            }, 0);

            return;
        }

        inst._changeState({items: data}, function(state) {
            inst.renderItems(state.items);
        });

        setTimeout(function() {
            input.value = null;
            input.blur();
        }, 0);
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

        if (!titleElements || !titleElements.length || !gridElements || !gridElements.length) {
            return;
        }

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
        return element && element.firstChild && element.firstChild.textContent || null;
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
            inst.generateTitle(inst.options.selectors.handoffTitle, inst.state);
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
                docsRequired: data['document-required'] === 'on',
                lockedFiles: data['locked-files'] === 'on',
                emailAlert: data.email
            }
        });
    },
    generatePreview: function(selector, data) {
        var $preview = $(selector);
        $preview.html(Mustache.render(templates.handoff, data));
    },
    generateTitle: function(selector, data) {
        var $title = $(selector),
            date = this._convertDate(data.publish),
            clientName = (data.client && data.client.name && data.client.name !== 'Not Available') ? data.client.name : '';

        var template = [
            data.client && data.client.highAlert ? '[!]' : '',
            date,
            (date && clientName) ? ' - ' : ' ',
            clientName,
            data.publish && data.publish.docsRequired ? ' [docs required]' : ''
        ].join('');

        template.trim().length ? $title.text((template) || '') : '';
    },
    _convertDate: function(data) {
        var dateString = '';

        if (!data) {
            return dateString;
        }

        var date = (data.date && data.date !== 'Not Available') ? data.date : false,
            time = (data.time && data.time !== 'Not Available') ? data.time : false;

        (date || time) ? dateString += '[' : null;
        (date) ? dateString += date : '';
        (date && time) ? dateString += ' / ' : null;
        (time) ? dateString += time : '';
        (date || time) ? dateString += '] ' : null;

        return dateString;
    },

    initTimeMaster: function() {
        var inst = this,
            options = inst.options,
            selectors = options.selectors,
            timers = (localStorage.getItem('timers') && JSON.parse(localStorage.getItem('timers'))) || [];

        inst.renderTimers(selectors.timeMaster, timers);
        inst.initNewTimer(selectors.timeMaster, timers);
        inst.initTimerActions(selectors.timeMaster, timers);
    },
    renderTimers: function(selector, array) {
        var inst = this,
            format = inst.options.dateFormat;

        array.sort(function(a, b){
            return new Date(a.dateTime) - new Date(b.dateTime);
        });

        inst._changeState({
            timers: array
        });

        var timers = array.map(function(timer) {
            timer.formattedDateTime = moment(timer.dateTime).format(format);
            return timer;
        });

        $(selector).html(Mustache.render(templates.timer, timers));
        this.initTimers(timers);
    },
    initTimers: function(timers) {
        var inst = this,
            selector = inst.options.selectors.timeMaster;

        inst.state.intervals.push(setInterval(function(){
            (timers || []).forEach(function(timer) {
                var dateTime = timer.dateTime,
                    timeLeft = moment.duration(moment(dateTime) - moment()),
                    countDown = timeLeft.hours() + "h " + timeLeft.minutes() + "m " + timeLeft.seconds() + 's',
                    $timer = $('#' + timer.id);

                $timer.find('.time-master_countdown > span').text(countDown);

                if (timeLeft.days() >= 0 && timeLeft.hours() >= 8) {
                    $timer.attr('class', 'time-master_item time-master_item--not-soon');
                }

                if (timeLeft.days() === 0 && timeLeft.hours() === 0 && timeLeft.minutes() <= 4) {
                    $timer.attr('class', 'time-master_item time-master_item--soon');
                }

                if (timeLeft.days() === 0 && timeLeft.hours() === 0 && timeLeft.minutes() <= 0) {
                    $timer.attr('class', 'time-master_item time-master_item--very-soon');
                }

                if (timeLeft.seconds() < 0) {
                    $timer.attr('class', 'time-master_item time-master_item--past');
                }

                if (timeLeft.minutes() <= '-1') {
                    inst.removeTimer($timer.index());
                }
            });
        }, 1000));
    },
    initNewTimer: function(selector, timers) {
        var inst = this;

        $(selector).on('click', '.time-master_item--new', function() {
            inst.addTimer(timers, {
                id: inst._createId(),
                client: 'New Test',
                dateTime: moment().add('7', 'minutes').format(),
                ticket: 123456
            });
        });
    },
    initTimerActions: function(selector) {
        var inst = this;

        $(selector).on('click', '.time-master_delete', function() {
            var $this = $(this),
                $timer = $this.closest('.time-master_item');

            inst.removeTimer($timer.index());
        });
    },
    addTimer: function(timers, data) {
        var inst = this,
            selector = inst.options.selectors.timeMaster;

        clearInterval(inst.state.intervals[0]);
        inst._changeState({
            intervals: []
        });

        timers.push(data);
        localStorage.setItem('timers', JSON.stringify(timers));
        inst.renderTimers(selector, timers);
    },
    removeTimer: function(index) {
        var inst = this,
            selector = inst.options.selectors.timeMaster;

        clearInterval(inst.state.intervals[0]);
        inst._changeState({
            intervals: []
        });

        inst._removeFromState('timers', index, function(array) {
            inst.renderTimers(selector, array);
            localStorage.setItem('timers', JSON.stringify(array));
        });
    },

    updateView: function(view) {
        var $tabs = $('.tabs_item'),
            $pages = $('.page_item');

        if (view.indexOf('#') >= 0) {
            view = view.slice(1);
        }

        $tabs.removeClass('tabs_item--active');
        $('.tabs_item[data-location="' + view + '"]').addClass('tabs_item--active');

        $pages.removeClass('page_item--active');
        $('#' + view).addClass('page_item--active');

        window.location.hash = view;
        $(window).scrollTop(0);
    },

    _createId: function() {
        return (100000000000 + Math.random() * 900000000000).toFixed();
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

        if (typeof target === 'string') {
            this.state[target].splice(index, 1);
            callback(this.state[target]);
        } else {
            target.subTarget.splice(index, 1);
            callback(this.state[target.target]);
        }
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
