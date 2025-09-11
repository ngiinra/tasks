// app/api/fonts/route.ts
import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET() {
  const sqlConnect = await db();
  const res = await sqlConnect.request().query("Select * from fonts");
  return NextResponse.json(res.recordset);
}
