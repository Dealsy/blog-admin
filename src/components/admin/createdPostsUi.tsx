import { Post } from "@/app/admin/page";
import Posts from "../posts/posts";
import HeaderTag from "../ui/header";

type SavedContentUIProps = {
  publicPosts: Post[];
};

export default function CreatedPostsUI({ publicPosts }: SavedContentUIProps) {
  return (
    <>
      <HeaderTag
        text="Created Posts"
        level="h2"
        className="text-2xl font-semibold"
      />
      <div className="mb-16 overflow-auto md:h-[70vh]">
        {publicPosts.length === 0 ? (
          <p className="text-xl font-semibold">
            You haven&apos;t created any posts yet
          </p>
        ) : (
          publicPosts.map(
            ({
              title,
              id,
              content,
              created_at,
              updated_at,
              sub_title,
              category,
              type,
            }) => (
              <Posts
                key={id}
                id={id}
                content={content}
                category={category}
                type={type}
                title={title}
                sub_title={sub_title}
                created_at={created_at}
                updated_at={updated_at}
              />
            )
          )
        )}
      </div>
    </>
  );
}
