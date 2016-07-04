var configs = [{
        name: "Last_Access_Time",
        type: 5,
        columns : [
            { title: "API" },
            { title: "Version" },
            { title: "Subscriber"  },
            { title: "Access Time"}
        ]
    }, {
        name:"API_Usage_By_Resource_Path",
        type: 6,
        columns : [
            { title: "API" },
            { title: "Version" },
            { title: "Context"  },
            { title: "Method"},
            { title: "Hits"}
        ]
    },
    {
        name:"API_Usage_By_Destination",
        type: 8,
        columns : [
            { title: "API" },
            { title: "Version" },
            { title: "Context"  },
            { title: "Destination Address"},
            { title: "No Of Access"}
        ]
    }
];