export const inboxEmailListResponse = {
    "status": true,
    "message": "Email list",
    "Receiver": [
        {
            "id": 31,
            "Sender": 6,
            "Receiver": [
                1
            ],
            "Cc": [],
            "Subject": "asasda",
            "Body": "fsadfas",
            "Date": "2023-01-21T01:57:05.458151+06:00",
            "Draft": false,
            "ReceiverLabel": "None",
            "ReceiverImportant": true,
            "ReceiverRead": false,
            "ReceiverTrash": false,
            "ReceiverDelete": false
        },
        {
            "id": 32,
            "Sender": 2,
            "Receiver": [
                1
            ],
            "Cc": [
                5
            ],
            "Subject": "dfsafadlsjflkasjfdlkajsdlkfjaslkdjf",
            "Body": "ffsadfasfasdfasdhjkfjkasdhflkasdjflasdj",
            "Date": "2023-01-21T01:57:42.936293+06:00",
            "Draft": false,
            "ReceiverLabel": "Important",
            "ReceiverImportant": false,
            "ReceiverRead": true,
            "ReceiverTrash": false,
            "ReceiverDelete": false
        }
    ],
    "Cc": [],
    "Bcc": [
        {
            "id": 33,
            "Sender": 2,
            "Receiver": [
                6
            ],
            "Cc": [],
            "Subject": "dsfkjdsal;kf;lasldf';",
            "Body": "fdshfkasjdhf",
            "Date": "2023-01-21T01:57:55.301051+06:00",
            "Draft": false,
            "BccLabel": "Private",
            "BccImportant": true,
            "BccRead": true,
            "BccTrash": false,
            "BccDelete": false
        }
    ]
}

export const sentEmailListResponse = {
    "status": true,
    "message": "Sent email list",
    "data": [
        {
            "id": 21,
            "Receiver": [
                2
            ],
            "Cc": [],
            "Bcc": [],
            "Subject": "Test email",
            "Body": "This is an test email",
            "Date": "2023-01-20T22:47:14.293310+06:00",
            "Draft": false,
            "SenderLabel": "None",
            "SenderImportant": false,
            "SenderTrash": false,
            "SenderDelete": false
        },
        {
            "id": 22,
            "Receiver": [
                5
            ],
            "Cc": [],
            "Bcc": [],
            "Subject": "Test email with faysal",
            "Body": "This is also an test email",
            "Date": "2023-01-20T22:48:53.576125+06:00",
            "Draft": false,
            "SenderLabel": "None",
            "SenderImportant": true,
            "SenderTrash": false,
            "SenderDelete": false
        },
        {
            "id": 23,
            "Receiver": [
                3
            ],
            "Cc": [
                2
            ],
            "Bcc": [
                4
            ],
            "Subject": "Test",
            "Body": "This is test message",
            "Date": "2023-01-20T22:51:51.199060+06:00",
            "Draft": false,
            "SenderLabel": "Personal",
            "SenderImportant": false,
            "SenderTrash": false,
            "SenderDelete": false
        },
        {
            "id": 24,
            "Receiver": [
                3
            ],
            "Cc": [
                2
            ],
            "Bcc": [
                4
            ],
            "Subject": "teste",
            "Body": "fasdfasf",
            "Date": "2023-01-20T22:51:58.389342+06:00",
            "Draft": true,
            "SenderLabel": "None",
            "SenderImportant": false,
            "SenderTrash": false,
            "SenderDelete": false
        },
        {
            "id": 25,
            "Receiver": [
                5
            ],
            "Cc": [
                2
            ],
            "Bcc": [
                2
            ],
            "Subject": "Test again",
            "Body": "Test message",
            "Date": "2023-01-20T23:19:55.779560+06:00",
            "Draft": false,
            "SenderLabel": "None",
            "SenderImportant": true,
            "SenderTrash": true,
            "SenderDelete": false
        },
        {
            "id": 26,
            "Receiver": [
                2
            ],
            "Cc": [
                2,
                4
            ],
            "Bcc": [
                3,
                5
            ],
            "Subject": "test",
            "Body": "tests",
            "Date": "2023-01-20T23:24:13.574068+06:00",
            "Draft": false,
            "SenderLabel": "None",
            "SenderImportant": true,
            "SenderTrash": false,
            "SenderDelete": false
        },
        {
            "id": 29,
            "Receiver": [
                2
            ],
            "Cc": [],
            "Bcc": [],
            "Subject": "",
            "Body": "",
            "Date": "2023-01-21T01:08:48.113259+06:00",
            "Draft": false,
            "SenderLabel": "None",
            "SenderImportant": false,
            "SenderTrash": false,
            "SenderDelete": false
        }
    ]
}

// export const emailResponse = {
//     "status": true,
//     "message": "Bcc email detail",
//     "data": {
//         "id": 33,
//         "Sender": 2,
//         "Receiver": [
//             6, 7
//         ],
//         "Cc": [4,5],
//         "Subject": "dsfkjdsal;kf;lasldf';",
//         "Body": "fdshfkasjdhf",
//         "Date": "2023-01-21T01:57:55.301051+06:00",
//         "Draft": false,
//         "BccLabel": "Private",
//         "BccImportant": true,
//         "BccRead": true,
//         "BccTrash": false,
//         "BccDelete": false
//     }
// }
export const emailResponse = {
    "status": true,
    "message": "Sent email detail",
    "data": {
        "id": 22,
        "Receiver": [
            5,6
        ],
        "Cc": [2,1],
        "Bcc": [2.3],
        "Subject": "Test email with faysal",
        "Body": "This is also an test email",
        "Date": "2023-01-20T22:48:53.576125+06:00",
        "Draft": false,
        "SenderLabel": "None",
        "SenderImportant": true,
        "SenderTrash": false,
        "SenderDelete": false
    }
}