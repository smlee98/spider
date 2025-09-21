import { createBrowserClient, createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 클라이언트 사이드용 (anon key 사용)
export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// 서버 사이드용 (anon key 사용, 쿠키 기반 인증)
export const createServerClient = async () => {
  const cookieStore = await cookies();

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
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

// 관리자용 서버 클라이언트 (service role key 사용)
export const createAdminClient = () => {
  return createSupabaseServerClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// 기존 호환성을 위한 export
export const supabase = createClient();

// Storage bucket name
export const IMAGES_BUCKET = "images";

export function getImageUrl(path: string) {
  return `${supabaseUrl}/storage/v1/object/public/${IMAGES_BUCKET}/${path}`;
}
