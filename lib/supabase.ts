import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const IMAGES_BUCKET = "images";

export function getImageUrl(path: string) {
  return `${supabaseUrl}/storage/v1/object/public/${IMAGES_BUCKET}/${path}`;
}
