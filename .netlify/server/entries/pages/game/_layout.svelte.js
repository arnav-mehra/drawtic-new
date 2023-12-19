import { c as create_ssr_component, b as subscribe } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
const userStore = writable(null);
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userStore;
  $$unsubscribe_userStore = subscribe(userStore, (value) => value);
  $$unsubscribe_userStore();
  return `<div><div data-svelte-h="svelte-nlr3we">Navbar</div> ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
