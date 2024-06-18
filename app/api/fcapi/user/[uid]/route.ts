import users from "@/app/data/users.json";
import fc from "@/app/data/fc.json";
import u2fc from "@/app/data/u2fc.json";
import { NextResponse } from 'next/server'

import { NextApiRequest, NextApiResponse } from "next";

export default function getAllFCByUID(req: NextApiRequest, res: NextApiResponse) {
  res.json({ byId: req.query.id, message: "getAllFCByUID" })
}

// export async function GET(request: Request, context: any) {
//   const { params } = context;
//   const user = users.filter(x => params.uid === x.uid)
//   const users_fc = u2fc.filter(x => user[0].uid === x.uid)
//   const flashcards = fc.filter(x => users_fc[0].fcid === x.fcid)

//   return NextResponse.json({
//     flashcards
//   })
// }