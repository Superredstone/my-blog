import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface PostProps {
  title: string;
  shortDescription: string;
  tags: string;
  image: string;
  uuid: string;
}

export const Post = component$((props: PostProps) => {
  return (
    <div class="bg-dracula-current-line max-w-lg rounded overflow-hidden shadow-xl text-dracula-fg">
      <a href={"/posts/" + props.uuid}>
        <img class="w-full" src={props.image} alt="image" />
      </a>
      <div class="px-6 py-4">
        <a class="font-bold text-xl mb-2" href={"/posts/" + props.uuid}>
          {props.title}
        </a>
        <p class="text-dracula-current-linee">{props.shortDescription}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        {props.tags.split(",").map((obj) => (
          <span class="inline-block bg-dracula-bg rounded-full px-3 py-1 text-sm text-dracula-purple font-semibold text-gray-700 mr-2 mb-2">
            {obj}
          </span>
        ))}
      </div>
    </div>
  );
});
