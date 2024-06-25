import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  User,
  Flashcard,
  Cardset,
  Users_Flashcards,
  Users_Cardsets,
  Cardsets_Flashcards,
  UserField
} from './definitions';
import { auth } from '@/auth'


export async function getUID() {
  noStore();
  const sesh = await auth()

  try {
    const user = await sql<User>`
    SELECT *
    FROM users
    WHERE email=${sesh?.user?.email}`

    return user.rows[0].uid
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

const ITEMS_PER_PAGE = 5;
export async function fetchFilteredFlashcards(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const usr = getUID()
    /*    const flashcards = await sql<FlashcardsTable>`
          SELECT
            fc.fcid,
            fc.front_text
          FROM users u
          LEFT JOIN users_flashcards ufc ON ufc.uid = u.uid
          LEFT JOIN flashcards fc ON ufc.fcid = fc.fcid
          WHERE
            fc.front_text ILIKE ${`%${query}%`} OR
            fc.back_text ILIKE ${`%${query}%`}
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
    */

    const flashcards = await sql<Flashcard>`
    SELECT
      fcid,
      front_text,
      back_text,
      front_img,
      back_img
    FROM flashcards
    WHERE
      front_text ILIKE ${`%${query}%`} OR
      back_text ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `

    return flashcards.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch flashcards. : ${error}`);
  }
}

export async function fetchUserFlashcards() {
  noStore();

  try {
    const usr = getUID()

    const flashcards = await sql<Flashcard>`
    SELECT
      fcid,
      front_text,
      back_text,
      front_img,
      back_img
    FROM flashcards
      `

    return flashcards.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch user flashcards. : ${error}`);
  }
}

// export async function fetchFlashcardById(id: string){
//   noStore();
//   try{
//     const data = await sql<Flashcard>`
//     SELECT
//       fcid,
//       front_text,
//       back_text,
//       front_img,
//       back_img
//     FROM flashcards
//     WHERE fcid = ${id}
//     `

//     return data.rows[0]
//   } catch (error){
//     console.error('Database Error:', error);
//     throw new Error(`${error}`)
//     // throw new Error(`Failed to fetch Flashcard: ${id}`)
//   }
// }

export async function fetchFlashcardsPages(query: string) {
  noStore();

  try {
    const usr = getUID()
    const count = await sql`SELECT COUNT(*)
    FROM flashcards
    WHERE
      front_text ILIKE ${`%${query}%`} OR
      back_text ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of flashcards.');
  }
}

export async function fetchFilteredCardsets(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const usr = getUID()
    const cardsets = await sql<Cardset>`
    SELECT
      csid,
      title,
      created_by,
      share
    FROM cardsets
    WHERE
      title ILIKE ${`%${query}%`} OR
      created_by ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return cardsets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch card sets. : ${error}`);
  }
}

export async function fetchCardsetsPages(query: string) {
  noStore();

  try {
    const usr = getUID()
    const count = await sql`SELECT COUNT(*)
    FROM cardsets
    WHERE
      title ILIKE ${`%${query}%`} OR
      created_by ILIKE ${`%${query}%`} 
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of card sets.');
  }
}

export async function fetchCardsetById(id: string) {
  noStore();
  try {
    const data = await sql<Cardset>`
      SELECT
        csid,
        title,
        created_by,
        share
      FROM cardsets
      WHERE csid = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cardset.');
  }
}

export async function fetchCS2FC(id: string) {
  noStore();
  try {
    const data = await sql<Cardsets_Flashcards>`
    SELECT
    csid,
    fcid
    FROM cardsets_flashcards
    WHERE csid = ${id}`

    return data.rows;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Failed to fetch CS2FC')
  }
}