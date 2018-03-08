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
        'For now, paste items in as you would normally!' +
        // '{{#items}}' +
        //     '<h3>{{title}}</h3>' +
        //     '<table>' +
        //         '<thead>' +
        //             '<tr>' +
        //                 '{{#columns}}' +
        //                     '<td>{{.}}</td>' +
        //                 '{{/columns}}' +
        //             '</tr>' +
        //         '</thead>' +
        //         '<tbody>' +
        //         '{{#data}}' +
        //             '<tr>' +
        //                 '<td>{{date}}</td>' +
        //                 '<td>{{title}} {{#flags}}<code>{{.}}</code>{{/flags}}</td>' +
        //                 '<td>{{user}}</td>' +
        //                 '<td>{{active}}</td>' +
        //                 '<td>{{delete}}</td>' +
        //                 '<td>{{status}}</td>' +
        //             '</tr>' +
        //         '{{/data}}' +
        //         '</tbody>' +
        //     '</table>' +
        // '{{/items}}' +
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
    )
};
