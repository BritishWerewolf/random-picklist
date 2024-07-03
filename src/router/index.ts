import { createRouter, createWebHistory } from 'vue-router';
import { useListsStore } from '@/stores/lists';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list/:name',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
  ]
});

export default router;
