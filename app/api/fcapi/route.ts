import { NextResponse } from 'next/server'

const { db } = require('@vercel/postgres');

export async function GET(request: Request, context: any) {
  const client = await db.connect();

  // const { params } = context
  // const fc = data.filter((x) => params.fcid === x.fcid);

  try {
    const fc = await client.sql`
    SELECT *
    FROM flashcards
    `

    const flashcards = fc.rows

    return NextResponse.json({ flashcards })
  } catch (e) {
    console.error("Error getting flashcards : " + e)
  }

}



// import { NextResponse } from 'next/server'
// import { fetchUserFlashcards } from "@/app/lib/data";

// export async function GET(request: Request, context: any) {

//   try {
//     const usr_fc = await fetchUserFlashcards()

//     return NextResponse.json({ usr_fc })
//   } catch (e) {
//     console.error("Error getting flashcards : " + e)
//   }
// }