import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
    User,
    Flashcard,
    Cardset,
    Users_Flashcards,
    Users_Cardsets,
    Cardsets_Flashcards,
    UserField,
    FlashcardsTable,
    CardsetsTable,
    FlashcardForm
} from './definitions';
// import { formatCurrency } from './utils';


const ITEMS_PER_PAGE = 5;
export async function fetchFilteredFlashcards(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
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

    const flashcards = await sql<FlashcardsTable>`
    SELECT
      fcid,
      front_text,
      back_text
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

export async function fetchFlashcardById(id: string){
  noStore();
  try{
    const data = await sql<FlashcardForm>`
    SELECT
      fcid,
      front_text,
      back_text,
      front_img,
      back_img,
    FROM flashcards
    WHERE fcid = ${id}
    `

    return data.rows[0]
  } catch (error){
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch Flashcard: ${id}`)
  }
}

export async function fetchFlashcardsPages(query: string){
  noStore();

  try {
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
    const cardsets = await sql<CardsetsTable>`
    SELECT
      csid,
      name,
      created_by
    FROM cardsets
    WHERE
      name ILIKE ${`%${query}%`} OR
      created_by ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return cardsets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch card sets. : ${error}`);
  }
}

export async function fetchCardsetsPages(query: string){
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM cardsets
    WHERE
      name ILIKE ${`%${query}%`} OR
      created_by ILIKE ${`%${query}%`} 
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of card sets.');
  }
}