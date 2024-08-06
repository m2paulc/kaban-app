import { cn } from "@/app/lib/utils";
import { useStore } from "../store";

export default function Task({ title }: { title: string }) {
	// let status = "Ongoing";
	const task = useStore((store) =>
		store.tasks.find((task) => task.title === title)
	);
	return (
		<div className="bg-slate-200 rounded-md p-2 text-black my-4">
			<p>{task?.title}</p>
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
