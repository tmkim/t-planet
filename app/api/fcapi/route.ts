import { NextResponse } from 'next/server'
import { getUID } from '@/app/lib/data';

const { db } = require('@vercel/postgres');

export async function GET(request: Request, context: any) {
  const client = await db.connect();

  // const { params } = context
  // const fc = data.filter((x) => params.fcid === x.fcid);

  try {
    const usr = await getUID()
    const fc = await client.sql`
      SELECT 
        fc.front_text,
        fc.back_text,
        fc.front_img,
        fc.back_img
      FROM 
        users u
      JOIN 
        users_flashcards ufc 
        ON
          ufc.uid = u.uid
      JOIN 
        flashcards fc 
        ON 
          ufc.fcid = fc.fcid
      WHERE
        u.uid = ${usr} 
    `

    const flashcards = fc.rows

    return NextResponse.json({ flashcards })
  } catch (e) {
    console.error("Error getting flashcards : " + e)
  }

}