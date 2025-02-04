import { NextResponse } from 'next/server';

interface User {
  email: string;
  password: string;
}

const users: User[] = [];

export async function POST(req: Request) {
  const { email, password }: User = await req.json();

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    const token = Buffer.from(`${email}:${password}`).toString('base64');
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
  }
}