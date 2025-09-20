import { CommunityPostForm } from "../../community-form";
import { getCommunityPost } from "@/actions/community/actions";

export default async function CommunityEditPageContent({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getCommunityPost({ id });

  return (
    <div className="flex min-h-full flex-col">
      <CommunityPostForm
        defaultValues={data ? { title: data.title || "", content: data.content || "" } : undefined}
        id={id}
      />
    </div>
  );
}
