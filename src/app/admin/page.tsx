import PostForm from "@/components/posts/Form";
import HeaderTag from "@/components/ui/header";
import AdminSkelton from "@/components/ui/skeletons/adminSkeleton";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedContentUI from "@/components/admin/savedContentUI";
import CreatedPostsUI from "@/components/admin/createdPostsUi";
import getMyPosts from "@/api/endpoints";

export type Post = {
  id: number;
  title: string;
  sub_title: string;
  content: string;
  created_at: string;
  updated_at: string;
  category?: string;
  type?: string;
  shouldFocus?: boolean;
};

export default async function Page() {
  const { posts, error } = await getMyPosts();

  if (error) {
    return <div>{error}</div>;
  }

  const data = posts ? posts : [];

  const privatePosts = data.filter((post) => post.type === "private");
  const publicPosts = data.filter((post) => post.type === "public");

  return (
    <main className="mx-auto mt-10 flex max-w-6xl flex-col p-10 md:px-20">
      <Suspense fallback={<AdminSkelton />}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <HeaderTag
              text="Your Posts "
              level="h1"
              className="mb-4 mt-4 text-3xl font-semibold md:mt-0"
            />

            <Tabs defaultValue="public" className="max-w-[450px]">
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="public">
                  Public Posts {publicPosts.length}
                </TabsTrigger>
                <TabsTrigger className="w-full" value="saved">
                  Saved Posts {privatePosts.length}{" "}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="saved">
                <SavedContentUI privatePosts={privatePosts} />
              </TabsContent>
              <TabsContent value="public">
                <CreatedPostsUI publicPosts={publicPosts} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="order-1 flex flex-col gap-2 md:order-2">
            <PostForm />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
