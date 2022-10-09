import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="p-10">
      <p class="text-6xl text-dracula-purple">$ whoami</p>
      <p class="text-2xl pt-5 md:flex md:columns-2 md:items-center md:justify-between">
        Currently i am a student and i live in Italy &#127470;&#127481;, <br />
        i learned my first programming language (Python &#128013;) when i was 12
        years old.
        <br />
        My favourite programming language is Golang but i also like JS, Python
        and C#.
        <img class="mt-5 mr-20" src="favicon.svg"></img>
      </p>
      <p class="text-4xl text-dracula-fg pt-10">Socials: </p>
      <ul class="text-2xl text-dracula-purple pl-4 pt-2 underline">
        <li>
          <a href="https://instagram.com/r3ddy_loves_coding">Instagram</a>
        </li>
        <li>
          <a href="https://github.com/Superredstone">Github</a>
        </li>
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Patrick Canal - About me",
};
