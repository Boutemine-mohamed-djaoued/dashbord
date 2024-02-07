import { writable } from 'svelte/store';

class AppState {
  constructor() {
    this.showNav = writable(false);
  }
}


const appStore = new AppState();

export default appStore;