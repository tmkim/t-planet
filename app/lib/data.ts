import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  User,
  Flashcard,
  Cardset,
  Cardsets_Flashcards
} from './definitions';
import { auth } from '@/auth'
import { dataFocusVisibleClasses } from '@nextui-org/react';
import { error } from 'console';


export async function getUser() {
  noStore();
  const sesh = await auth()

  try {
    const user = await sql<User>`
    SELECT *
    FROM users
    WHERE email=${sesh?.user?.email}`

    return user.rows[0]
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredFlashcards(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const usr = await getUser()
    const flashcards = await sql<Flashcard>`
      SELECT
        fc.fcid,
        fc.front_text,
        fc.back_text,
        fc.front_img,
        fc.back_img
      FROM users u
      JOIN users_flashcards ufc ON ufc.uid = u.uid
      JOIN flashcards fc ON ufc.fcid = fc.fcid
      WHERE
        u.uid = ${usr.uid} 
      AND 
        (
          fc.front_text ILIKE ${`%${query}%`}
        OR
          fc.back_text ILIKE ${`%${query}%`}
        )
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return flashcards.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch flashcards. : ${error}`);
  }
}

export async function fetchUserFlashcards() {
  noStore();

  try {
    const usr = await getUser()

    const flashcards = await sql<Flashcard>`
      SELECT
        fc.fcid,
        fc.front_text,
        fc.back_text,
        fc.front_img,
        fc.back_img
      FROM users u
      JOIN users_flashcards ufc ON ufc.uid = u.uid
      JOIN flashcards fc ON ufc.fcid = fc.fcid
      WHERE
        u.uid = ${usr.uid} 
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
    const usr = await getUser()
    const count = await sql`SELECT COUNT(*)
      FROM users u
      JOIN users_flashcards ufc ON ufc.uid = u.uid
      JOIN flashcards fc ON ufc.fcid = fc.fcid
      WHERE
        u.uid = ${usr.uid} 
      AND 
      (
        front_text ILIKE ${`%${query}%`} 
      OR
        back_text ILIKE ${`%${query}%`}
      )
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of flashcards.');
  }
}

export async function fetchBrowseCardsets(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  try{
    const usr = await getUser()
    const cardsets = await sql<Cardset>`
    SELECT
      c.csid,
      c.title,
      c.created_by,
      c.share
    FROM
      cardsets c 
    WHERE
      c.share = 'true'
    `

    return cardsets.rows
  } catch(e){
    throw new Error(`Error browsing cardsets: ${e}`);
  }
}

export async function fetchFilteredCardsets(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const usr = await getUser()
    const cardsets = await sql<Cardset>`
    SELECT
      c.csid,
      c.title,
      c.created_by,
      c.share
    FROM users u
    JOIN users_cardsets uc on u.uid = uc.uid
    JOIN cardsets c on uc.csid = c.csid
    WHERE
      u.uid = ${usr.uid}
      AND
      (
        title ILIKE ${`%${query}%`} 
      OR
        created_by ILIKE ${`%${query}%`} 
      )
      
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return cardsets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch card sets. : ${error}`);
  }
}

// export async function fetchFclChecked(fcl: Flashcard[]) {
//   noStore()

//   try {
//     const fcl_c = await sql`
//     SELECT
//       c.csid,
//       cf.fcid
//     FROM
//       cardsets c
//     LEFT JOIN
//       cardsets_flashcards cf
//     ON
//       c.csid = cf.csid
//     `

//   } catch (error) {
//     console.error('Error fetching checked flash cards', error);
//     throw new Error(`Error fetching checked flash cards ${error}`);
//   }
// }

export async function fetchCardsetsPages(query: string) {
  noStore();

  try {
    const usr = await getUser()
    const count = await sql`
      SELECT COUNT(*)
      FROM 
        users u
      JOIN 
        users_cardsets uc ON u.uid = uc.uid
      JOIN 
        cardsets c ON uc.csid = c.csid
      WHERE
        u.uid = ${usr.uid}
      AND
      (
        title ILIKE ${`%${query}%`} 
      OR
        created_by ILIKE ${`%${query}%`} 
      )
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

export async function fetchCS_FC(id: string){
  noStore();
  try{
    const data = await sql`
    SELECT
      fcid
    FROM
      cardsets_flashcards
    WHERE
      csid = ${id}`
    
    var fcid_list = []
    for (var d of data.rows){
      fcid_list.push(d.fcid)
    }
    return fcid_list
  } catch (e){
    console.error('DB Error: ', e)
    throw new Error('Failed to fetch CS_FC')
  }
}

export async function fetchBrowseFCL(id: string){
  noStore();
  try{
    const data = await sql<Flashcard>`
    SELECT
      f.*
    FROM cardsets_flashcards cf
    JOIN flashcards f
    ON cf.fcid = f.fcid
    WHERE cf.csid = ${id}`

    return data.rows
  }catch (e){
    console.error('DDB Error: ', e)
    throw new Error('Failed to fetch flashcard list for card set: ' + id)
  }
}

export async function fetchCS2FC(id: string) {
  noStore();
  try {
    const data = await sql`
    SELECT
      cf.csid,
      cf.fcid,
      f.front_text
    FROM 
      cardsets_flashcards cf
    JOIN 
      flashcards f
    ON 
      cf.fcid = f.fcid
    WHERE cf.csid = ${id}`

    return data.rows;
  } catch (error) {
    console.error('DB Error:', error);
    throw new Error('Failed to fetch CS2FC')
  }
}