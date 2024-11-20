import { useContext, useEffect, useState } from "react";
import { Context } from "../Global";
import { Dropdown } from "./dropdown";

type Policy = {
    id: number, title: string, description: string, category: string, owner: number, created_at: string; lname: string, fname: string; votes: number;
};

export function Policy(policy: Policy) {
    const [vote, setVote] = useState(policy.votes);
    const { enc_data, hash_data, isAuthenticated } = useContext(Context);
    const date = new Date(policy.created_at);
    const url = import.meta.env.VITE_BACKEND_URL + "vote";
    const localDate = date.toLocaleDateString();
    const upVote = async () => {

        if (!isAuthenticated()) {
            alert("Please log in first");
            return;
        }
        const result = await fetch(url, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${enc_data}.${hash_data}`,
            },
            body: JSON.stringify({ policy_id: policy.id })

        });
        const raw_response = await result.json();
        if (raw_response.success) {
            setVote(vote + 1);
        }
        else {
            alert(raw_response.msg);
        }
    };
    return (
        <>
            <div className='flex mb-5 mt-5 h-full mx-8'>
                <div className="rounded-xl border p-5 shadow-md bg-white">
                    <div className="flex w-full items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                            <div className="text-lg font-bold text-slate-700">{policy.fname} {policy.lname}</div>
                        </div>
                        <div className="flex items-center space-x-8">
                            <div className="text-xs text-neutral-500">{
                                localDate}</div>
                        </div>
                    </div>
                    <div className="mt-4 mb-6">
                        <div className="mb-3 text-xl font-bold">{policy.title}</div>
                        <div className="text-sm text-neutral-600">{policy.description}</div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between text-slate-500">
                            <div className="flex space-x-4 md:space-x-8">
                                <button onClick={upVote}><div className="flex cursor-pointer items-center transition hover:text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    <span>{vote}</span>
                                </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export function Policies() {
    const years = ["2024", "2023", "2022", "2021"];
    const categories = ["General", "Food", "Dormitory", "Education", "Library"];
    const [category, setCategory] = useState(categories[0]);
    const [year, setYear] = useState(years[0]);
    const [policies, setPolicies] = useState<Policy[]>([]);
    const url = import.meta.env.VITE_BACKEND_URL + `policies?category=${category}&year=${year}`;
    useEffect(() => {
        async function getPolicies() {
            const result = await fetch(url);
            const policyList = await result.json();
            if (policyList.success) {
                setPolicies(policyList.policies);
            }
        }
        getPolicies();
    }, [category, year]);
    return (<>
        <div className="flex justify-end">
            <Dropdown method={setCategory} data={categories}></Dropdown>
            <Dropdown method={setYear} data={years}></Dropdown>
        </div>

        <div className="grid grid-cols-2 gap-5 justify-between">
            {policies.map((policy) => {
                return <Policy key={policy.id} {...policy} />;
            })}
        </div>
    </>);

}
