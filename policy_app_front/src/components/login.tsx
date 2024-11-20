import { useContext, FormEvent, useState, ChangeEvent } from 'react';
import { Context } from '../Global';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL + 'login';
    const [email, setEmail] = useState("");
    const { login } = useContext(Context);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const raw_response = await fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const response = await raw_response.json();

        if (response.success) {
            const plain_data = JSON.parse(atob(response.enc_data));
            login(plain_data.email, response.enc_data, response.hash_data);
            navigate("/");
        }
        else alert(response.msg);

    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); }}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>


                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}