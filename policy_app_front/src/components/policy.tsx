import { FormEvent, useState, ChangeEvent, useContext } from 'react';
import { Context } from '../Global';
import { useNavigate } from 'react-router-dom';

export default function NewPolicy() {

    const { enc_data, hash_data } = useContext(Context);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL + 'policies';
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("General");
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const raw_response = await fetch(url, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${enc_data}.${hash_data}`,
            },
            body: JSON.stringify({ description, title, category })
        });

        const response = await raw_response.json();

        if (response.success) {
            alert("Successfully created");
            navigate("/");
        }
        else alert(response.msg);

    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <label className="block text-sm/6 font-medium text-gray-900">
                            Title
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                value={title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value); }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <label className="block text-sm/6 font-medium text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                value={description}
                                maxLength={500}
                                minLength={40}
                                rows={8}
                                cols={40}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { setDescription(e.target.value); }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <label className="block text-sm/6 font-medium text-gray-900">
                            Category
                        </label>
                        <div className="mt-2">
                            <select id="category" value={category} onChange={(e: ChangeEvent<HTMLSelectElement>) => { setCategory(e.target.value); }} className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                <option value="General">General</option>
                                <option value="Food">Food</option>
                                <option value="Library">Library</option>
                                <option value="Education">Education</option>
                                <option value="Dormitory">Dormitory</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            POST
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}