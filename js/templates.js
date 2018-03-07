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
            '<h2>Publishing Information (Part 1)</h2>' +
            '<b>Date</b>: {{publish.date}} <br>' +
            '<b>Time</b>: {{publish.time}} <br>' +
            '<b>Documents Required</b>: {{#docsRequired}}Yes{{/docsRequired}}{{^docsRequired}}No{{/docsRequired}} <br>' +
            '<b>Locked Files</b>: {{#lockedFiles}}Yes{{/lockedFiles}}{{^lockedFiles}}No{{/lockedFiles}} <br>' +
            '<b>Email Alert Action</b>: {{publish.emailAlert}} <br>' +
        '{{/publish}}' +
        '<br>' +
        '<h2>Items to be Published</h2>' +
        '{{#items}}' +
            '<h3>{{title}}</h3>' +
            '<table>' +
                '<thead>' +
                    '<tr>' +
                        '{{#columns}}' +
                            '<td>{{.}}</td>' +
                        '{{/columns}}' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                '{{#data}}' +
                    '<tr>' +
                        '<td>{{date}}</td>' +
                        '<td>{{title}} {{#flags}}<code>{{.}}</code>{{/flags}}</td>' +
                        '<td>{{user}}</td>' +
                        '<td>{{active}}</td>' +
                        '<td>{{delete}}</td>' +
                        '<td>{{status}}</td>' +
                    '</tr>' +
                '{{/data}}' +
                '</tbody>' +
            '</table>' +
        '{{/items}}' +
        '<br>' +
        '<h2>Locked Files</h2>' +
        '{{#files}}' +
            '{{.}}<br>' +
        '{{/files}}' +
        '<br>' +
        '<h2>Live Links</h2>' +
        '{{#links}}' +
            '<a href="{{.}}">{{.}}</a><br>' +
        '{{/links}}' +
        '<br>' +
        '{{#credentials}}' +
            '<h2>Credentials</h2>' +
            '<b>Type</b>: <a href="{{url}}">{{type}}</a><br>' +
            '<b>Username</b>: {{username}}<br>' +
            '<b>Password</b>: {{password}}<br>' +
        '<br>' +
        '{{/credentials}}' +
        '<h2>Comments</h2>' +
            '<ol>' +
            '{{#comments}}' +
                '<li>{{.}}</li>' +
            '{{/comments}}' +
        '</ol>'
    ),
    files: (
        '<article class="field_item field_item--truncate">' +
            '<span class="field_delete">-</span>' +
            '<span class="field_value">{{.}}</span>' +
        '</article>'
    ),
    links: (
        '<article class="field_item field_item--truncate">' +
            '<span class="field_delete">-</span>' +
            '<a href="{{.}}" class="field_value" target="_blank">{{.}}</a>' +
        '</article>'
    ),
    comments: (
        '<article class="field_item field_item--comment">' +
            '<span class="field_delete">-</span>' +
            '<span class="field_value">{{.}}</span>' +
        '</article>'
    )
};
