import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useListsStore = defineStore('lists', () => {
  /** State */
  const lists = ref<Array<List>>([]);

  /** Getters */
  const listNames = computed(() => lists.value.map(list => list.name));

  /** Actions */
  function addItem(listId: number, item: Item) {
    lists.value = lists.value.map(list => {
      if (list.id === listId) {
        list.items.push(item);
      }
      return list;
    });
  }

  function createList(name: string, items: Array<Item> = []): List {
    // Create a variable so that we can return it after pushing.
    const list: List = {
      id: lists.value.length + 1,
      name,
      items,
    };
    lists.value.push(list);
    return list;
  }

  function removeList(listId: number) {
    lists.value = lists.value.filter(list => list.id !== listId);
  }

  function setList(listId: number, newList: List): Array<List> {
    lists.value = lists.value.map(list => {
      if (list.id === listId) {
        list = newList;
      }
      return list;
    });
    return lists.value;
  }

  function removeItem(listId: number, itemId: number) {
    lists.value = lists.value.map(list => {
      if (list.id === listId) {
        list.items = list.items.filter(item => item.id !== itemId);
      }
      return list;
    });
  }

  function totalWeight(listName: string) {
    return lists.value
      .filter(list => list.name === listName)
      .reduce((acc, list) => {
        return acc + list.items.reduce((acc, item) => acc + item.weight, 0);
      }, 0);
  }

  return {
    /** State */
    lists,

    /** Getters */
    listNames,

    /** Actions */
    addItem,
    createList,
    removeList,
    setList,
    removeItem,
    totalWeight,
  };
}, {
  persist: true,
});
