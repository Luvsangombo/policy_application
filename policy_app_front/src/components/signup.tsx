import { FormEvent, useState, ChangeEvent } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL + 'signup';
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [entry_year, setEntry] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const raw_response = await fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, lname, fname, entry_year })
        });

        const response = await raw_response.json();

        if (response.success) {

            alert("Successfully registered!!!");
            navigate("/login");
        }
        else alert(response.msg);

    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <label className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); }}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <label className="block text-sm/6 font-medium text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                id="fname"
                                value={fname}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setFname(e.target.value); }}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <label className="block text-sm/6 font-medium text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                id="lname"
                                value={lname}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setLname(e.target.value); }}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <label className="block text-sm/6 font-medium text-gray-900">
                            Entry year
                        </label>
                        <div className="mt-2">
                            <input
                                id="entry"
                                type="date"
                                value={entry_year}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEntry(e.target.value); }}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>


                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}
