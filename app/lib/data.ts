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
} from './definitions';
// import { formatCurrency } from './utils';


const ITEMS_PER_PAGE = 10;
export async function fetchFilteredFlashcards(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const flashcards = await sql<FlashcardsTable>`
      SELECT
        fc.id,
        fc.front_text
      FROM users u
      JOIN users_flashcards ufc ON ufc.uid = u.uid
      JOIN flashcards fc ON ufc.fcid = fc.fcid
      WHERE
        fc.front_text ILIKE ${`%${query}%`} OR
        fc.back_text ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return flashcards.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch flashcards. : ${error}`);
  }
}