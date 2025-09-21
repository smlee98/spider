import { CommunityPostForm } from "../community-form";

export default async function CommunityNewPageContent() {
  return (
    <div className="flex min-h-full flex-col">
      <CommunityPostForm />
    </div>
  );
}
