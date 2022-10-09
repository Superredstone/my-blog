import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import config from "../../../config.json";

interface state {
  err: PostgrestError | null;
  isLoading: Boolean;
  postData: {
    id: String;
    created_at: String;
    author: String;
    title: String;
    short_description: String;
    image: String;
    content: String;
    tags: String;
  } | null;
}

export default component$(() => {
  const store = useStore<state>({
    err: null,
    isLoading: true,
    postData: {
      id: "",
      created_at: "",
      author: "",
      title: "",
      short_description: "",
      image: "",
      content: "",
      tags: "",
    },
  });

  const location = useLocation();

  useClientEffect$(() => {
    const supabase = createClient(config.api_url, config.api_key);

    async function getPostData() {
      store.isLoading = true;

      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", location.params.uuid);

      if (error != null) {
        store.err = error;
      } else {
        store.postData = post[0];
      }

      store.isLoading = false;
    }

    getPostData();
  });

  return (
    <>
      {store.isLoading ? (
        <div class="text-center mt-10">Loading..</div>
      ) : (
        <div class="p-10 flex flex-col bg-dracula-bg">
          <h1 class="text-5xl">{store.postData?.title.toString()}</h1>
          <h2 class="pt-4 text-dracula-purple">
            Author: {store.postData?.author.toString()} <br />
            Posted on:{" "}
            {new Date(store.postData?.created_at as string).toLocaleDateString(
              undefined,
              { day: "numeric", month: "2-digit", year: "numeric" }
            )}
          </h2>
          <img
            class="mt-5 mb-5 md:max-w-xl sm:w-full min-w-0 justify-center m-auto"
            src={store.postData?.image.toString()}
          ></img>
          <p
            class="post-content text-xl"
            dangerouslySetInnerHTML={store.postData?.content.toString()}
          ></p>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Patrick Canal - Post",
};
