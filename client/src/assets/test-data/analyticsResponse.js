export const userListResponse = {
    "status": true,
    "message": "User list",
    "data": [
        {
            "id": 1,
            "is_superuser": true,
            "username": "san",
            "first_name": "Siyam Ahmmed",
            "last_name": "Nahid",
            "email": "siyam14.boy@gmail.com",
            "is_active": true
        },
        {
            "id": 2,
            "is_superuser": false,
            "username": "Estiak",
            "first_name": "Md",
            "last_name": "Estiak",
            "email": "estiak97@gmail.com",
            "is_active": true
        },
        {
            "id": 3,
            "is_superuser": false,
            "username": "Raihan",
            "first_name": "Abu Bakar",
            "last_name": "Raihan",
            "email": "raihan@gmail.com",
            "is_active": true
        },
        {
            "id": 4,
            "is_superuser": false,
            "username": "Sajal",
            "first_name": "Nahidul Islam",
            "last_name": "Molla",
            "email": "sajal@gmail.com",
            "is_active": false
        },
        {
            "id": 5,
            "is_superuser": false,
            "username": "faysal",
            "first_name": "Md",
            "last_name": "Faysal",
            "email": "faysal@diu.ac",
            "is_active": true
        },
        {
            "id": 6,
            "is_superuser": false,
            "username": "Rafique",
            "first_name": "Mohammad",
            "last_name": "Rafique",
            "email": "rafique.me77@gmail.com",
            "is_active": true
        },
        {
            "id": 7,
            "is_superuser": false,
            "username": "Anonna",
            "first_name": "Anonna Akter",
            "last_name": "Mim",
            "email": "anonna@gmail.com",
            "is_active": true
        },
    ]
};

export const myTaskListResponse = {
    "status": true,
    "message": "My task list",
    "data": [
        {
            "id": 21,
            "TaskCompleted": true,
            "Assignee": 2
        },
        {
            "id": 29,
            "TaskCompleted": false,
            "Assignee": 2
        }
    ]
};

export const meAsSupervisorListResponse = {
    "status": true,
    "message": "Me as Supervisor list",
    "data": [
        {
            "id": 21,
            "TaskCompleted": true,
            "user": 1
        },
        {
            "id": 22,
            "TaskCompleted": false,
            "user": 1
        },
        {
            "id": 25,
            "TaskCompleted": false,
            "user": 1
        },
        {
            "id": 26,
            "TaskCompleted": false,
            "user": 1
        },
        {
            "id": 27,
            "TaskCompleted": false,
            "user": 1
        },
        {
            "id": 28,
            "TaskCompleted": false,
            "user": 1
        },
        {
            "id": 29,
            "TaskCompleted": false,
            "user": 1
        },
        {
            "id": 31,
            "TaskCompleted": true,
            "user": 1
        }
    ]
};

export const eventListResponse = {
    "status": true,
    "message": "Event list",
    "data": [
        {
            "id": 30,
            "EndDateTime": "2023-01-21T21:37:00+06:00"
        },
        {
            "id": 31,
            "EndDateTime": "2022-11-02T22:44:24+06:00"
        },
        {
            "id": 32,
            "EndDateTime": "2023-01-31T21:45:00+06:00"
        },
        // {
        //     "id": 33,
        //     "EndDateTime": "2023-01-28T21:48:00+06:00"
        // },
        // {
        //     "id": 34,
        //     "EndDateTime": "2023-01-19T09:53:00+06:00"
        // },
        // {
        //     "id": 35,
        //     "EndDateTime": "2023-01-31T10:44:00+06:00"
        // }
    ]
};

export const allTeacherListResponse = {
    "status": true,
    "message": "Teacher rank list",
    "data": [
        {
            "id": 2,
            "Name": "Md. Tahzib Ul Islam",
            "complete_task": 2,
            "incomplete_task": 1
        },
        {
            "id": 3,
            "Name": "Md. Abdul Based",
            "complete_task": 2,
            "incomplete_task": 1
        },
        {
            "id": 6,
            "Name": "Md. Nur-A-Alam",
            "complete_task": 1,
            "incomplete_task": 1
        },
        {
            "id": 4,
            "Name": "Khandaker Mohammad Mohi Uddin",
            "complete_task": 0,
            "incomplete_task": 4
        },
        {
            "id": 5,
            "Name": "Md. Mahbubur Rahman",
            "complete_task": 0,
            "incomplete_task": 3
        },
        {
            "id": 7,
            "Name": "Md. Shariful Islam",
            "complete_task": 0,
            "incomplete_task": 1
        },
        {
            "id": 8,
            "Name": "Md.Zahidul Islam",
            "complete_task": 0,
            "incomplete_task": 1
        }
    ]
}