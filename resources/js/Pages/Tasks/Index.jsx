import PrimaryNavLink from "@/Components/PrimaryNavLink";
import TextInput from "@/Components/TextInput";
import { Link, Head, usePage } from "@inertiajs/react";

const Index = (props) => {
    const { tasks } = usePage().props;

    const destroy = (e) => {
        if (confirm("Are you sure you want to delete this task?")) {
            delete route("tasks.destroy", e.currentTarget.id);
        }
    };

    return (
        <>
            <Head title="Tasks" />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto min-h-screen flex flex-col justify-center bg-white px-8">
                    <div className="flex items-center justify-between mb-4 w-full px-8">
                        <div>
                            <h3 className="font-bold text-xl">Tasks</h3>
                        </div>
                        <div>
                            <PrimaryNavLink href={route("tasks.create")}>
                                Add
                            </PrimaryNavLink>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Completed
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(
                                    ({
                                        id,
                                        title,
                                        description,
                                        is_completed,
                                    }) => (
                                        <tr
                                            key={id}
                                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <TextInput
                                                    name="is_completed"
                                                    type="checkbox"
                                                    checked={is_completed ?? ""}
                                                />
                                            </th>
                                            <td className="px-6 py-4">
                                                {title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {description}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <PrimaryNavLink
                                                        href={route(
                                                            "tasks.edit",
                                                            id
                                                        )}
                                                    >
                                                        Edit
                                                    </PrimaryNavLink>
                                                    <button
                                                        onClick={destroy}
                                                        id={id}
                                                        tabIndex="-1"
                                                        type="button"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded-md"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                                {tasks.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-6 py-4 border-t text-center"
                                            colSpan="4"
                                        >
                                            No task found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Index;
