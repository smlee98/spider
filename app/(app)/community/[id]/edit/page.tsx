import { getCommunityPost } from "@/actions/community/actions";
import { CommunityPostForm } from "../../community-form";

export default async function CommunityEditPageContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getCommunityPost({ id: parseInt(id) });

  return (
    <div className="flex min-h-full flex-col">
      <CommunityPostForm
        defaultValues={data ? { title: data.title || "", content: data.content || "" } : undefined}
        id={id}
      />
    </div>
  );
}
