import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { request } from "http";
import { NextResponse } from "next/server";


//how middleware in next js work YT tutorial
export async function middleware(req: any) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();
    const currentUser = req.cookies.get('currentUser')?.value;

    // if(currentUser && !req.nextUrl.pathname.startsWith('/dashboard')) {
    //     return Response.redirect(new URL('/dashboard', req.url))
    // }

    // if(!currentUser && !req.nextUrl.pathname.startsWith('login')){
    //     return Response.redirect(new URL('/login', req.url))
    // }
    console.log("req", req)
    console.log("crrent", currentUser)


    return res;
}
