var data = {
    client: {
        name: "Nataly Gold",
        url: "https://nataly2017ir.s3.q4web.com",
        highAlert: true
    },
    publish: {
        date: "MM/DD/YYYY",
        time: "hh:mma Z",
        docsRequired: true,
        lockedFiles: true,
        emailAlert: "Manual"
    },
    items: [
        // TODO:
        // Page Name, Module Title, Module Definition Name, Layout Definition Name, Site Name
        // Lookup Text, Lookup Value, Css Name, Date, Title, Headline, Year, Person Name
        {
            title: "Events",
            columns: ["Date","Title","User","Active","Delete","Status"],
            data: [{
                date: "MM/DD/YYYY",
                title: "Event Title",
                flag: ["docs req"],
                user: "natalys",
                active: "Y",
                delete: "N",
                status: "For Approval"
            }]
        },
        {
            title: "Presentations",
            columns: ["Date","Title","User","Active","Delete","Status"],
            data: [{
                date: "MM/DD/YYYY",
                title: "Presentation Title",
                flag: ["docs req"],
                user: "natalys",
                active: "Y",
                delete: "N",
                status: "In progress"
            }]
        },
        {
            title: "Press Releases",
            columns: ["Date","Headline","User","Active","Delete","Status"],
            data: [{
                date: "MM/DD/YYYY",
                title: "Press Release Headline",
                flag: ["docs req"],
                user: "natalys",
                active: "Y",
                delete: "N",
                status: "For Approval"
            }]
        },
        {
            title: "Reports",
            columns: ["Date","Title","User","Active","Delete","Status"],
            data: [{
                date: "MM/DD/YYYY",
                title: "Download Report Item",
                flag: ["docs req"],
                user: "natalys",
                active: "Y",
                delete: "N",
                status: "For Approval"
            }]
        },
        {
            title: "Pages",
            columns: ["Page Name","User","Active","Delete","Status"],
            data: [{
                date: "MM/DD/YYYY",
                title: "Test Page Name",
                user: "nataly",
                active: "Y",
                delete: "N",
                status: "For Approval"
            }]
        },
        {
            title: "Modules",
            columns: ["Module Title","User","Active","Delete","Status"],
            data: [{
                date: "MM/DD/YYYY",
                title: "Test Page Name",
                user: "nataly",
                active: "Y",
                delete: "N",
                status: "For Approval"
            }]
        }
    ],
    files: [
        "/files/doc_presentations/2018/03/presentation.pdf",
        "/files/doc_news/2018/03/news.pdf"
    ],
    links: [
        "https://www.natalygold.com/investors/events/default.aspx",
        "https://www.natalygold.com/investors/presentations/default.aspx",
        "https://www.natalygold.com/investors/news/default.aspx"
    ],
    credentials: [{
        type: "slideshare",
        url: "http://www.slideshare.net",
        username: "natalygold@gmail.com",
        password: "natalyGoldPass1234!"
    }],
    comments: [
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum"
    ]
};
