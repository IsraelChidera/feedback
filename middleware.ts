import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { useState } from "react";
const protectedRoutes = ["/dashboard", "/dashboard/profile"];
const isAuthenticated = false;


//how middleware in next js work YT tutorial
export async function middleware(req: NextRequest) {
    // if (isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    //     const absoluteURL = new URL("/", req.nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString());
    // }
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession();
    return res;
}
