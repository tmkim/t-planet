import { NextResponse } from 'next/server'
import { getUser } from '@/app/lib/data';
import { CLIENT_STATIC_FILES_RUNTIME_AMP } from 'next/dist/shared/lib/constants';

const { db } = require('@vercel/postgres');

export async function GET(request: Request, { params }: { params: { csid: string } }) {
  const client = await db.connect();

  const csid = params.csid

  try {
    // const cs = await client.sql`
    //   SELECT 
    //     *
    //   FROM 
    //     cardsets
    //   WHERE
    //     csid = ${csid} 
    // `

    const cards = await client.sql`
      SELECT 
        c.csid, f.fcid
      FROM
        cardsets c
      JOIN
        cardsets_flashcards cfc ON c.csid = cfc.csid
      JOIN 
        flashcards f ON cfc.fcid = f.fcid
      WHERE
        c.csid = ${csid}

    `

    const cardset = cards.rows

    return NextResponse.json({ cardset })
  } catch (e) {
    console.error("Error getting flashcards : " + e)
  }

}