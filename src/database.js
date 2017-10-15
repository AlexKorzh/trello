let database = {
    users: [
        {
            name: 'Alex',
            email: 'korzhlesha@gmail.com',
            password: 'ungg123123'
        }
    ],
    boards:[
        {
            name: 'UpWork',
            id: 'someId',
            lists: [
                {
                    name: 'ListName',
                    cards: {
                        id: '123',
                        name: 'CardName',
                        description: 'SomeDesctiption',
                        attachments: {
                            image: 'url image'
                        }
                    }
                }
            ]
        }
    ]
};

export default database;
