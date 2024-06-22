const users = [
    {
        uid: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Sab',
        email: 'taeminkim13@gmail.com',
        password: 'monkey',
    },
]

const flashcards = [
    {
        fcid: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        front_text: 'Delba de Oliveira',
        back_text: 'delba@oliveira.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        front_text: 'Lee Robinson',
        back_text: 'lee@robinson.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        front_text: 'Hector Simpson',
        back_text: 'hector@simpson.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        front_text: 'Steven Tey',
        back_text: 'steven@tey.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        front_text: 'Steph Dietz',
        back_text: 'steph@dietz.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        front_text: 'Michael Novotny',
        back_text: 'michael@novotny.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        front_text: 'Evil Rabbit',
        back_text: 'evil@rabbit.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
        front_text: 'Emil Kowalski',
        back_text: 'emil@kowalski.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        front_text: 'Amy Burns',
        back_text: 'amy@burns.com',
        front_img: '',
        back_img: '',
    },
    {
        fcid: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        front_text: 'Balazs Orban',
        back_text: 'balazs@orban.com',
        front_img: '',
        back_img: '',
    },
];

const cardsets = [
    {
        csid: '410544b2-4201-4271-9855-fec4b6a6442a',
        title: 'bing bong 1',
        created_by: users[0].name,
        share: 'true'
    },
    {
        csid: '410544b2-4301-4271-9855-fec4b6a6442a',
        title: 'bing bong 2',
        created_by: users[0].name,
        share: 'true'
    },
    {
        csid: '410544b2-4401-4271-9855-fec4b6a6442a',
        title: 'bing bong 3',
        created_by: users[0].name,
        share: 'true'
    },
]

const users_flashcards = [
    {
        uid: users[0].uid,
        fcid: flashcards[0].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[1].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[2].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[3].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[4].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[5].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[6].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[7].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[8].fcid,
    },
    {
        uid: users[0].uid,
        fcid: flashcards[9].fcid,
    }
]


const users_cardsets = [
    {
        uid: users[0].uid,
        csid: cardsets[0].csid,
    },
    {
        uid: users[0].uid,
        csid: cardsets[1].csid,
    },
    {
        uid: users[0].uid,
        csid: cardsets[2].csid,
    },
]

const cardsets_flashcards = [
    {
        csid: cardsets[0].csid,
        fcid: flashcards[0].fcid
    },
    {
        csid: cardsets[0].csid,
        fcid: flashcards[1].fcid
    },
    {
        csid: cardsets[0].csid,
        fcid: flashcards[2].fcid
    },
    {
        csid: cardsets[1].csid,
        fcid: flashcards[3].fcid
    },
    {
        csid: cardsets[1].csid,
        fcid: flashcards[4].fcid
    },
    {
        csid: cardsets[1].csid,
        fcid: flashcards[5].fcid
    },
    {
        csid: cardsets[2].csid,
        fcid: flashcards[6].fcid
    },
    {
        csid: cardsets[2].csid,
        fcid: flashcards[7].fcid
    },
    {
        csid: cardsets[2].csid,
        fcid: flashcards[8].fcid
    },
    {
        csid: cardsets[2].csid,
        fcid: flashcards[9].fcid
    },
]

module.exports = {
    users,
    flashcards,
    cardsets,
    users_cardsets,
    users_flashcards,
    cardsets_flashcards
};
