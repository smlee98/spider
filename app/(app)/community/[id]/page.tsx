import { getCommunityPost } from "@/actions/community/actions";
import { getSession } from "@/actions/user/action";
import { notFound } from "next/navigation";
import { CommunityPost } from "../community-post";

export default async function CommunityDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const data = await getCommunityPost({ id });
  const { user } = await getSession();

  if (!data) return notFound();

  return (
    <div className="flex min-h-full flex-col">
      <CommunityPost user={user} data={data} />
    </div>
  );
}
