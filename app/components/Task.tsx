import { cn } from "@/app/lib/utils";
import { useStore } from "../store";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Task({ title }: { title: string }) {
	const task = useStore((store) =>
		store.tasks.find((task) => task.title === title)
	);
	const deleteTask = useStore((store) => store.deleteTask);
	return (
		<div className="bg-slate-200 rounded-md p-2 text-black my-4">
			<div className="flex items-center justify-between p-2">
				<p>{task?.title}</p>
				<button onClick={() => deleteTask(title)} className="size-5">
					<TrashIcon />
				</button>
			</div>
			<div className="flex justify-end items-center mt-2">
				<p
					className={cn("p-2 rounded-md text-xs", {
						"bg-gray-700 text-white": task?.state === "Todo",
						"bg-orange-500": task?.state === "Ongoing",
						"bg-green-500": task?.state === "Completed",
					})}
				>
					{task?.state}
				</p>
			</div>
		</div>
	);
}
