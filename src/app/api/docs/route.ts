import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
    const result = await query({
        sql: "SELECT * FROM documents",
        values: []
    });
    return NextResponse.json(result, {status: 200});
}

export async function POST(req:Request, res: Response) {
    const body = await req.json();
    const {user, product} = body;

    const result = await query({
        sql: "INSERT INTO documents (user, product) VALUES (?, ?)",
        values: [user, product]
    })
    return NextResponse.json(result, {status: 200})
    
}