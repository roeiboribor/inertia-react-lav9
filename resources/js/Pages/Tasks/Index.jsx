import PrimaryNavLink from "@/Components/PrimaryNavLink";
import TextInput from "@/Components/TextInput";
import { Link, Head, usePage } from "@inertiajs/react";

const Index = (props) => {
    const { tasks } = usePage().props;

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
                                {tasks.map(({ id, title, description }) => (
                                    <tr
                                        key={id}
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <TextInput
                                                name="is_completed[]"
                                                type="checkbox"
                                            />
                                        </th>
                                        <td className="px-6 py-4">Silver</td>
                                        <td className="px-6 py-4">Laptop</td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
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
