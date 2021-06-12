import { SvelteComponentTyped } from "svelte";

declare type AppProps = {
  target: Node;
  props: object;
};
export default class App extends SvelteComponentTyped<AppProps> {}
