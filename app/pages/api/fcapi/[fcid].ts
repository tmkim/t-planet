import data from "@/app/data/fc.json";
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: any) {
  const { params } = context;
  const fc = data.filter((x) => params.fcid === x.fcid.toString());

  return NextResponse.json({
    fc
  })
}