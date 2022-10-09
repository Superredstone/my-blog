import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import config from "../config.json";

import { createClient, PostgrestError } from "@supabase/supabase-js";

import { Post } from "../components/post/post";

interface postTemplate {
  id: String; // UUID
  created_at: String;
  title: String;
  short_description: String;
  image: String;
  content: String;
  tags: String;
}

interface state {
  err: PostgrestError | null;
  isLoading: Boolean;
  lastPosts: postTemplate[] | null;
  allPosts: postTemplate[] | null;
}

export default component$(() => {
  const store = useStore<state>({
    err: null,
    isLoading: true,
    lastPosts: [],
    allPosts: [],
  });

  useClientEffect$(() => {
    const supabase = createClient(config.api_url, config.api_key);

    async function getBlogData() {
      store.isLoading = true;

      const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      // .range(0, 2);  // WARNING: I don't need this code anymore

      if (error != null) {
        store.err = error;
      } else {
        store.lastPosts = [posts[0], posts[1], posts[2]];
        store.allPosts = posts;
      }

      store.isLoading = false;
    }

    getBlogData();
  });

  return (
    <>
      {store.isLoading ? (
        <div class="text-center">Loading...</div>
      ) : (
        <>
          <div class="pl-10 pr-10">
            <p class="mb-3">Last articles: </p>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
              {store.lastPosts?.map((e) => {
                if (!e) {
                  return;
                }
                return (
                  <Post
                    title={e.title.toString()}
                    shortDescription={e.short_description.toString()}
                    image={e.image.toString()}
                    tags={e.tags.toString()}
                    uuid={e.id.toString()}
                  ></Post>
                );
              })}
            </div>
          </div>
          <div class="pl-10 pr-10 pt-10">
            <p class="mb-3">Old articles: </p>
            <div class="grid mkd:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
              {store.allPosts?.map((e) => {
                if (!e) {
                  return;
                }
                return (
                  <Post
                    title={e.title.toString()}
                    shortDescription={e.short_description.toString()}
                    image={e.image.toString()}
                    tags={e.tags.toString()}
                    uuid={e.id.toString()}
                  ></Post>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Patrick Canal - Home",
};
