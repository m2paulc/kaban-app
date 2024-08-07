"use client";

import { useMemo, useState } from "react";
import { cn } from "@/app/lib/utils";
import { useStore } from "@/app/store";
import Task from "@/app/components/Task";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function Column({ state }: { state: string }) {
	const [text, setText] = useState("");
	const [open, setOpen] = useState(false);
	const [drop, setDrop] = useState(false);
	const tasks = useStore((state) => state.tasks);
	const filteredTasks = useMemo(
		() => tasks.filter((task) => task.state === state),
		[tasks, state]
	);
	const addTask = useStore((store) => store.addTask);
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	const draggedTask = useStore((store) => store.draggedTask);
	const moveTask = useStore((store) => store.moveTask);
	return (
		<div
			className={cn(
				"bg-slate-600 text-white rounded-md p-2 w-[30%] min-h-44",
				drop && "bg-yellow-500"
			)}
			onDragOver={(e) => {
				e.preventDefault();
				setDrop(true);
			}}
			onDragLeave={(e) => {
				e.preventDefault();
				setDrop(false);
			}}
			onDrop={(e) => {
				moveTask(draggedTask, state);
				setDraggedTask("");
				setDrop(false);
			}}
		>
			<div className="flex items-center justify-start gap-12 m-4">
				<button
					onClick={() => setOpen(true)}
					className="size-6 text-white hover:size-7 transition-all duration-300 ease-in-out"
				>
					<PlusCircleIcon />
				</button>
				<h2 className="text-center font-bold text-xl">{state}</h2>
			</div>
			{filteredTasks.map((task) => (
				<Task title={task.title} key={task.title} />
			))}
			{open && (
				<div className="absolute top-0 left-0 w-full h-full bg-green/50 flex items-center justify-center rounded-md p-4 text-black">
					<div className="absolute bg-slate-200 z-10 text-black p-8 rounded-md">
						<input
							onChange={(e) => setText(e.target.value)}
							value={text}
							className="rounded-md p-2 mb-4"
						/>
						<button
							onClick={() => {
								addTask(text, state);
								setText("");
								setOpen(false);
							}}
							className="ml-4 rounded-md bg-blue-500 p-2 text-white"
						>
							Submit
						</button>
						<button
							onClick={() => setOpen(false)}
							className="size-5 absolute top-1 right-2"
						>
							<XCircleIcon />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
