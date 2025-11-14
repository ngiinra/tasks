import { NextResponse } from "next/server";
import db from "../../../../../../../lib/db";
import sql from "mssql";

export async function POST(
  request: Request,
  context: { params: { id: string; tagId: string } }
) {
  const body = await request.json();
  const { text, value, active } = body;
  const params = context.params;
  try {
    const sqlConnect = await db();
    await sqlConnect
      .request()
      .input("id", sql.Int, Number(params.tagId))
      .input("text", sql.NVarChar, text)
      .input("value", sql.NVarChar, value)
      .input("active", sql.Bit, active)
      .query(
        "UPDATE tags set text= @text, value= @value, active=@active where id=@id"
      );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("update error:", JSON.stringify(e, null, 2));

    return NextResponse.json(
      { error: "update tag has failed." },
      { status: 500 }
    );
  }
}
