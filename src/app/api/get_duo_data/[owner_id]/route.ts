import { NextRequest, NextResponse } from 'next/server';
import DuoService from '@/app/services/duo_service';


interface Params {
    owner_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const {owner_id} = await params;
  const duoService = new DuoService();
  const duo = await duoService.getData(parseInt(owner_id));

  if (!duo) {
    return new NextResponse('Not found duo', { status: 404 });
  }

  return NextResponse.json({ duo }, { status: 200 });
}