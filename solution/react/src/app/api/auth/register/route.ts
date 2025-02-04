import { NextResponse } from 'next/server';

interface User {
  email: string;
  password: string;
}

const users: User[] = [];

export async function POST(req: Request) {
  const { email, password }: User = await req.json();

  if (users.find(user => user.email === email)) {
    return NextResponse.json({ error: 'Usuario ya existe' }, { status: 400 });
  }

  users.push({ email, password });
  return NextResponse.json({ message: 'Usuario registrado' }, { status: 201 });
}