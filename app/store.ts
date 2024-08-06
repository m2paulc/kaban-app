import { create } from "zustand";

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
}

export const useStore = create<StoreState>((set) => ({
	tasks: [],
	addTask: (title, state) =>
		set((store) => ({ tasks: [...store.tasks, { title, state }] })),
	deleteTask: (title) =>
		set((store) => ({
			tasks: store.tasks.filter((task) => task.title !== title),
		})),
}));
