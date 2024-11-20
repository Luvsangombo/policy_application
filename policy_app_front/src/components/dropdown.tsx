

import { useState } from "react";


interface Props {
    method(arg: string): void;
    data: string[];
}

export const Dropdown: React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, SetValue] = useState(props.data[0]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = (year: string) => {
        setIsOpen(false);
        SetValue(year);
        props.method(year);
    };

    return (
        <div className='py-6 pb-8 mx-8'>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="px-4 py-2 text-black bg-gray-100 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    {value} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                            {props.data.map((val) => {
                                return (
                                    <li key={val}>
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => closeDropdown(val)}
                                        >
                                            {val}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

