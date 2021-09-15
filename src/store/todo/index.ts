import { atom, selector } from "recoil";

export const filterState = atom({
    key: "filterState",
    default: "Show All" as Filter
});

export const todoListState = atom({
    key: "todoListState",
    default: [] as Todo[]
});

export const filterTodoListState = selector({
    key: "filterTodoListState",
    get: ({ get }) => {
        const filter: Filter = get(filterState);
        const list: Todo[] = get(todoListState);
        switch (filter) {
            case "Show Done":
                return list.filter(item => item.isDone);
            case "Show Active":
                return list.filter(item => !item.isDone);
            default:
                return list;
        }
    }
});

export const todoStatsState = selector({
    key: "todoStatsState",
    get: ({ get }) => {
        const list = get(todoListState);
        const all = list.length;
        const done = list.filter(item => item.isDone).length;
        const active = all - done;
        const donePercentage = all === 0 ? 0 : done * 100 / all;

        return { all, done, active, donePercentage };
    }
})