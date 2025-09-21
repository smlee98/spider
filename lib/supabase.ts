import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 클라이언트 사이드용
export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// 서버 사이드용 (App Router)
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component에서는 쿠키 설정 무시
        }
      },
    },
  });
};


// 기존 호환성을 위한 export
export const supabase = createClient();

// Storage bucket name
export const IMAGES_BUCKET = "images";

export function getImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${IMAGES_BUCKET}/${path}`;
}
