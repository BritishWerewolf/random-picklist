import { defineStore } from "pinia";
import { ref } from "vue";

export const useListsStore = defineStore('lists', () => {
    const lists = ref<Array<List>>([]);

    function createList(name: string): List {
        const list: List = {
            id: lists.value.length + 1,
            name,
            items: [],
        };
        lists.value.push(list);
        return list;
    }

    function addItem(listId: number, item: Item) {
        lists.value = lists.value.map(list => {
            if (list.id === listId) {
                list.items.push(item);
            }
            return list;
        });
    }

    function removeItem(listId: number, itemId: number) {
        lists.value = lists.value.map(list => {
            if (list.id === listId) {
                list.items = list.items.filter(item => item.id !== itemId);
            }
            return list;
        });
    }

    return {
        lists,
        createList,
        addItem,
        removeItem,
    };
});
