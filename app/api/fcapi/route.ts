import data from "@/app/data/fc.json"
import { FlashcardsTable } from "@/app/lib/definitions";
import { NextResponse } from 'next/server'

const bcrypt = require('bcrypt');
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