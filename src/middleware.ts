import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const skip_pathames = ["/api/get_top_users"]
  let telegram_id;
  
  if (pathname == "/api/save_init_data"){
    return NextResponse.next()
  }

  if (req.method != "GET"){
    const body = await req.json();
    telegram_id = body.telegram_id
  }
  else if (skip_pathames.includes(pathname)) {
    return NextResponse.next()
  }
  else {
    telegram_id = pathname.split("/").pop();
  }

  if (!telegram_id){
    return
  }


  if (pathname.startsWith('/api/get_init_data')) {
    return
  }

  const res = await fetch(`http://site:3000/api/get_init_data/${telegram_id}`);
  const data = await res.json()  
  const initData = data.initData


  if (!initData){
    return new NextResponse("not validate initData",{status:401})
  }
  
  return NextResponse.next()

}

export const config = {
  matcher: ['/api/:path*']
};
