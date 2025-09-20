import { getSession } from "@/actions/user/action";
import { CommunityGrid } from "./community-grid";

export default async function CommunityPage() {
  const { user } = await getSession();
  return <CommunityGrid user={user} />;
}
