// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  uid: string;
  name: string;
  email: string;
  password: string;
};

export type Flashcard = {
  fcid: string;
  front_text: string;
  back_text: string;
  front_img: string;
  back_img: string;
};

export type Cardset = {
  csid: string;
  uid: string;
  title: string;
  created_by: string;
  share: boolean;
};

export type Users_Flashcards = {
  uid: string;
  fcid: string;
};

// export type Users_Cardsets = {
//   uid: string;
//   fcid: string;
// };

export type Cardsets_Flashcards = {
  csid: string;
  fcid: string;
};

export type UserField = {
  uid: string;
  name: string;
  email: string;
  password: string;
};

export type Cardsets_Flashcards_Helper = {
  fcid: string;
  front_text: string;
  back_text: string;
  front_img: string;
  back_img: string;
  checked: boolean;
}

export type Cardsets_Helper = {
  csid: string;
  uid: string;
  title: string;
  created_by: string;
  share: boolean;
  cs_fcl: Cardsets_Flashcards_Helper[];
  cards: string[];
  cs_view: Flashcard[];
}

// export type CardsetsTable = {
//   csid: string;
//   uid: string;
//   name: string;
//   created_by: string;
//   share: boolean;
// }
