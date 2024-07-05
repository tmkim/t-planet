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
  title: string;
  created_by: string;
  share: boolean;
};

export type Users_Flashcards = {
  uid: string;
  fcid: string;
};

export type Users_Cardsets = {
  uid: string;
  fcid: string;
};

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

export type Cardsets_Flashcards_List = {
  fcid: string;
  front_text: string;
  back_text: string;
  front_img: string;
  back_img: string;
  checked: boolean;
}

export type CardsetsTable = {
  csid: string;
  name: string;
  created_by: string;
  share: boolean;
}

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};