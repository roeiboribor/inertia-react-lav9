import { Link, Head, usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import PrimaryNavLink from "@/Components/PrimaryNavLink";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

const Index = (props) => {
    const { tasks } = usePage().props;
    const [modelId, setModelId] = useState("");
    const [confirmingTaskDeletion, setConfirmingTaskDeletion] = useState(false);

    const { delete: destroy, reset, put } = useForm();

    const confirmTaskDeletion = (e) => {
        setModelId(e.target.id);
        setConfirmingTaskDeletion(true);
    };

    const deleteTask = (e) => {
        e.preventDefault();

        destroy(route("tasks.destroy", modelId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => console.log("An error has occurred!"),
            onFinish: () => {
                reset();
                setModelId("");
            },
        });
    };

    const closeModal = () => {
        setConfirmingTaskDeletion(false);
        reset();
    };

    const handleCheckboxChanged = (e) => {
        put(route("tasks.updatedIsCompleted", e.target.id), {
            onError: () => console.log("An error has occurred!"),
        });
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
                                                    id={id}
                                                    name="is_completed"
                                                    type="checkbox"
                                                    checked={is_completed ?? ""}
                                                    onChange={
                                                        handleCheckboxChanged
                                                    }
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
                                                        onClick={
                                                            confirmTaskDeletion
                                                        }
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

                <Modal show={confirmingTaskDeletion} onClose={closeModal}>
                    <form onSubmit={deleteTask} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Are you sure you want to delete this task?
                        </h2>

                        <div className="mt-6 flex justify-end">
                            <DangerButton>Confirm</DangerButton>

                            <SecondaryButton
                                onClick={closeModal}
                                className="ml-3"
                            >
                                Cancel
                            </SecondaryButton>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
};
export default Index;
