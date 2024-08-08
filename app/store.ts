import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define the shape of a task
interface Task {
	title: string;
	state: string;
}

// Define the shape of the store
interface StoreState {
	tasks: Task[];
	addTask: (title: string, state: string) => void;
	deleteTask: (title: string) => void;
	draggedTask: string;
	setDraggedTask: (title: string) => void;
	moveTask: (title: string, state: string) => void;
}

export const useStore = create<StoreState>()(
	persist(
		devtools((set) => ({
			tasks: [],
			draggedTask: "",
			addTask: (title, state) =>
				set(
					(store) => ({ tasks: [...store.tasks, { title, state }] }),
					false,
					"addTask"
				),
			deleteTask: (title) =>
				set(
					(store) => ({
						tasks: store.tasks.filter((task) => task.title !== title),
					}),
					false,
					"deleteTask"
				),
			setDraggedTask: (title) =>
				set({ draggedTask: title }, false, "setDraggedTask"),
			moveTask: (title, state) =>
				set(
					(store) => ({
						tasks: store.tasks.map((task) =>
							task.title === title ? { ...task, state } : task
						),
					}),
					false,
					"moveTask"
				),
		})),
		{ name: "todoStore" }
	)
);
