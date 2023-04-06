import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryNavLink from "@/Components/PrimaryNavLink";
import TextInput from "@/Components/TextInput";
import { Head, usePage, Link, useForm } from "@inertiajs/react";

const Edit = () => {
    const { task } = usePage().props;

    const { data, setData, put, errors } = useForm({
        title: task.title || "",
        description: task.description || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("tasks.update", task.id));
    }

    return (
        <>
            <Head title="Tasks" />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto min-h-screen flex flex-col justify-center bg-white px-8">
                    <div className="w-full md:w-1/2 mx-auto">
                        <div className="flex items-center justify-between mb-4 w-full">
                            <div>
                                <h3 className="font-bold text-xl">Edit</h3>
                            </div>
                            <div>
                                <PrimaryNavLink href={route("tasks.index")}>
                                    Back
                                </PrimaryNavLink>
                            </div>
                        </div>
                        <form
                            name="createForm"
                            method="POST"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <InputLabel htmlFor="title">
                                        Title
                                    </InputLabel>
                                    <TextInput
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="w-full"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="mb-0">
                                    <InputLabel htmlFor="description">
                                        Description
                                    </InputLabel>
                                    <textarea
                                        id="description"
                                        name="description"
                                        type="text"
                                        className="w-full h-[200px] resize-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                                        errors={errors.description}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <PrimaryButton
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 active:bg-green-600 shadow-md"
                                >
                                    Update
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Edit;
