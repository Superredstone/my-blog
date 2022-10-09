import { component$, Slot, useStore } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore({
    isExpanded: false,
  });

  return (
    <>
      <header>
        <nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded">
          <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" class="flex items-center">
              <span class="self-center text-xl font-semibold text-dracula-fg">
                Patrick Canal - Blog
              </span>
            </a>
            <button
              type="button"
              class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
              onClick$={() => (store.isExpanded = !store.isExpanded)}
            >
              <span class="sr-only">Open menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              class={
                store.isExpanded
                  ? "w-full md:block md:w-auto"
                  : "hidden w-full md:block md:w-auto"
              }
              id="navbar-default"
            >
              <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-dracula-fg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                <li>
                  <a
                    href="/"
                    class="block py-2 pr-4 pl-3 rounded md:p-0 text-dracula-fg"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    class="block py-2 pr-4 pl-3 rounded md:border-0 md:p-0"
                  >
                    About me
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Slot />
      </main>
      <footer class="mt-10 mb-10">
        <a class="text-dracula-purple" href="/about" target="_blank">
          Made with ♡ by Patrick Canal
        </a>
      </footer>
    </>
  );
});
