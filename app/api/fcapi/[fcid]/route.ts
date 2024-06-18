import { NextResponse } from 'next/server'

const bcrypt = require('bcrypt');
const { db } = require('@vercel/postgres');

export async function GET(request: Request, context: any) {
  const client = await db.connect();

  const { params } = context

  try {
    const fc = await client.sql`
    SELECT *
    FROM flashcards
    WHERE fcid = (${params.fcid})::uuid
    `

    console.log('select good')

    return NextResponse.json({
      fc
    })
  } catch (e) {
    console.error(`Error getting flashcard '${params.fcid}'\n${e}`)
  }

}