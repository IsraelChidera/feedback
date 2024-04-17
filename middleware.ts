import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: any) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();
    
    const { data: { user } } = await supabase.auth.getUser();    

    if (user && req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!user && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return res;
}

export const config = {
    matcher: ['/login', '/dashboard', '/dashboard/profile', '/dashboard/add-admin-feedback']
}
