import axios from "@/Axios/axios";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditTask = ({ modelId, setConfirmingTaskEdit, setModelId }) => {
    const { data, setData, errors, processing, put } = useForm({
        title: "",
        description: "",
    });

    const getTask = async (e) => {
        const item = await axios
            .get(`/api/tasks/${modelId}/edit`)
            .then((data) => data.data);

        setData(item);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        put(route("tasks.update", modelId), {
            onSuccess: (page) => {
                setModelId("");
                setConfirmingTaskEdit(false);
            },
        });
    };

    const closeModal = () => {
        setConfirmingTaskEdit(false);
    };

    useEffect(() => {
        getTask();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-4 grid-cols-12">
                <div className="col-span-12">
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <TextInput
                        id="title"
                        name="title"
                        type="text"
                        className="w-full"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} />
                </div>
                <div className="col-span-12">
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <textarea
                        id="description"
                        name="description"
                        type="text"
                        className="w-full h-[200px] resize-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                        errors={errors.description}
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} />
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <PrimaryButton
                    id="updateBtn"
                    type="submit"
                    disabled={processing}
                    className="bg-green-500 hover:bg-green-600 transition focus:bg-green-600 active:bg-green-600 shadow"
                >
                    Update
                </PrimaryButton>

                <SecondaryButton
                    type="button"
                    onClick={closeModal}
                    className="ml-3"
                >
                    Cancel
                </SecondaryButton>
            </div>
        </form>
    );
};
export default EditTask;
