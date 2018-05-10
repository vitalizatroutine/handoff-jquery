var templates = {
    handoff: (
        '{{#client}}' +
            '<h2>Client Information</h2>' +
            '<b>Client Name</b>: {{client.name}} <br>' +
            '<b>CMS</b>: <a href="{{client.url}}">{{client.url}}</a><br>' +
            '<b>High Alert</b>: {{#highAlert}}Yes{{/highAlert}}{{^highAlert}}No{{/highAlert}}<br>' +
            '<hr>' +
        '{{/client}}' +
        '{{#publish}}' +
            '<h2>Publishing Information</h2>' +
            '<b>Date</b>: {{publish.date}} <br>' +
            '<b>Time</b>: {{publish.time}} <br>' +
            '<b>Documents Required</b>: {{#publish.docsRequired}}Yes{{/publish.docsRequired}}{{^publish.docsRequired}}No{{/publish.docsRequired}} <br>' +
            '<b>Locked Files</b>: {{#publish.lockedFiles}}Yes{{/publish.lockedFiles}}{{^publish.lockedFiles}}No{{/publish.lockedFiles}} <br>' +
            '<b>Email Alert Action</b>: {{publish.emailAlert}} <br>' +
        '{{/publish}}' +
        '<br><h2>Items to be Published</h2>' +
        '{{#items}}{{#rows.length}}{{#title}}' +
            '<h3>{{title}}</h3>' +
            '<table>' +
                '<thead>' +
                    '<tr>' +
                        '{{#columns}}' +
                            '<td><b>{{.}}</b></td>' +
                        '{{/columns}}' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    '{{#rows}}' +
                        '<tr>' +
                            '{{#.}}' +
                                '<td>{{.}}</td>' +
                            '{{/.}}' +
                        '</tr>' +
                    '{{/rows}}' +
                '</tbody>' +
            '</table>' +
            '<p></p>' +
        '{{/title}}{{/rows.length}}{{/items}}' +
        '{{#files.length}}<h2><br>Locked Files</h2>{{/files.length}}' +
        '{{#files}}' +
            '{{.}}<br>' +
        '{{/files}}' +
        '{{#links.length}}<br><h2>Live Links</h2>{{/links.length}}' +
        '{{#links}}' +
            '<a href="{{.}}">{{.}}</a><br>' +
        '{{/links}}' +
        '{{#credentials.length}}<br><h2>Credentials</h2>{{/credentials.length}}' +
        '{{#credentials}}' +
            '<b>Type</b>: <a href="{{url}}">{{type}}</a><br>' +
            '<b>Username</b>: {{username}}<br>' +
            '<b>Password</b>: {{password}}<br>' +
            '<br>' +
        '{{/credentials}}' +
        '{{#comments.length}}<br><h2>Comments</h2>' +
            '<ol>' +
            '{{#comments}}' +
                '<li>{{.}}</li>' +
            '{{/comments}}' +
        '</ol>{{/comments.length}}'
    ),
    items: (
        '{{#.}}' +
            '{{#rows.length}}{{#title}}' +
                '<table class="table">' +
                    '<thead class="table_header">' +
                        '<tr class="table_row table_row--title">' +
                            '<th></th>' +
                            '<th colspan="{{columns.length}}"><div class="table_title">{{title}}</div></th>' +
                        '</tr>' +
                        '<tr class="table_row table_row--header">' +
                            '<th class="table_cell"></th>' +
                            '{{#columns}}' +
                                '<th class="table_cell">{{.}}</th>' +
                            '{{/columns}}' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody class="table_body">' +
                        '{{#rows}}' +
                            '<tr class="table_row">' +
                                '<td class="table_cell">' +
                                    '<span class="table_delete" data-target="items">-</span>' +
                                '</td>' +
                                '{{#.}}' +
                                    '<td class="table_cell"><div>{{.}}</div></td>' +
                                '{{/.}}' +
                            '</tr>' +
                        '{{/rows}}' +
                    '</tbody>' +
                '</table>' +
            '{{/title}}{{/rows.length}}' +
        '{{/.}}'
    ),
    files: (
        '{{#.}}' +
            '<article class="field_item field_item--truncate">' +
                '<span class="field_delete" data-target="files" data-index="{{@index}}">-</span>' +
                '<span class="field_value">{{.}}</span>' +
            '</article>' +
        '{{/.}}'
    ),
    links: (
        '{{#.}}' +
            '<article class="field_item field_item--truncate">' +
                '<span class="field_delete" data-target="links" data-index="{{@index}}">-</span>' +
                '<a href="{{.}}" class="field_value" target="_blank">{{.}}</a>' +
            '</article>' +
        '{{/.}}'
    ),
    comments: (
        '{{#.}}' +
            '<article class="field_item field_item--comment">' +
                '<span class="field_delete" data-target="comments" data-index="{{@index}}">-</span>' +
                '<span class="field_value">{{.}}</span>' +
            '</article>' +
        '{{/.}}'
    ),
    timer: (
        '{{#.}}' +
            '<div class="time-master_item" data-dateTime="{{dateTime}}">' +
                '<header class="time-master_countdown">' +
                    '<span>00h 00m 00s</span>' +
                    '<div class="time-master_actions">' +
                       '<span class="time-master_delete button--square button button--transparent">' +
                            '<i class="q4i-edit-4pt"></i>' +
                        '</span>' +
                        '<span class="time-master_delete button--square button button--transparent">' +
                            '<i class="q4i-trashbin-4pt"></i>' +
                        '</span>' +
                    '</div>' +
                '</header>' +
                '<section class="time-master_details">' +
                    '<div class="time-master_client">' +
                        '<i class="q4i-contact-4pt"></i>' +
                        '<span>{{client}}</span>' +
                    '</div>' +
                    '<div class="time-master_time">' +
                        '<i class="q4i-time-4pt"></i>' +
                        '<span>{{formattedDateTime}} ET</span>' +
                    '</div>' +
                    '<div class="time-master_ticket">' +
                       '<i class="q4i-reportno-4pt"></i>' +
                        '<a href="{{ticket}}" target="_blank">#{{ticket}}</a>' +
                    '</div>' +
                '</section>' +
            '</div>' +
        '{{/.}}'
    )
};
