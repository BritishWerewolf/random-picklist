import { createRouter, createWebHashHistory } from 'vue-router';
import { useListsStore } from '@/stores/lists';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateListView.vue'),
    },
    {
      path: '/share/:data',
      name: 'share',
      redirect(to) {
        // No share URL was passed.
        if (typeof to.params.data !== 'string') {
          return { name: 'home' };
        }

        // Decode the Base64 string and parse into JSON.
        const json = JSON.parse(atob(to.params.data));
        if (!json.name && !json.weights) {
          return { name: 'home' };
        }

        const listName = json.name.trim().match(/(\w+)/)[0];
        if (!listName) {
          return { name: 'home' };
        }

        const listsStore = useListsStore();
        let list: List;
        // See if the user already has that list saved in the store, otherwise
        // create a new one.
        if (listsStore.listNames.includes(listName)) {
          list = listsStore.lists.filter(l => l.name === listName)[0];
          list.items = [];
        } else {
          list = listsStore.createList(listName);
        }

        for (let i = 0; i < json.items.length; i++) {
          listsStore.addItem(list.id, {
            id: i + 1,
            name: json.items[i].name,
            weight: json.items[i].weight,
          });
        }

        return {
          name: 'list',
          params: {
            name: listName,
          }
        };
      },
    },
    {
      path: '/list/:name',
      name: 'list',
      component: () => import('../views/ListView.vue'),
      beforeEnter: (to, from, next) => {
        const listsStore = useListsStore();
        const name = Array.isArray(to.params.name) ? to.params.name[0] : to.params.name;

        // If the list doesn't exist, redirect away.
        if (listsStore.lists.map(list => list.name).includes(name)) {
          next();
        } else {
          next({ name: 'home' });
        }
      }
    },
  ],
});

// Regardless of the route, we want to close the navigation drawer.
router.afterEach(() => {
  const closeNavButton: HTMLButtonElement | null = document.querySelector("[id^='radix-vue-dialog-content-1'] button[class*='data-[state=open]'");
  if (closeNavButton) {
    closeNavButton.click();
  }
});

export default router;
