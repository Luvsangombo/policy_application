import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Global';
export function Header() {
    const { isAuthenticated, email, logout } = useContext(Context);
    return (<>
        {isAuthenticated() ? (
            <><header className='flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
                <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
                    <Link to="/"><div className='max-lg:border-b max-lg:py-3 px-3'>
                        <span className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Home</span>
                    </div>
                    </Link>
                    <div className='flex items-center ml-auto space-x-6'>
                        Welcome <span className='font-semibold text-[15px] pl-2'> {email}</span>
                        <Link to="/create"><button className='font-semibold text-[15px] border-none outline-none'>
                            <span className='text-[#007bff] hover:underline'>New Policy</span></button>
                        </Link>
                        <Link to="/">
                            <button onClick={() => { logout(); }}
                                className='px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Log out
                            </button>
                        </Link>
                    </div>
                </div>
            </header></>
        ) : (
            <>
                <header className='flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
                    <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
                        <Link to="/"><div className='max-lg:border-b max-lg:py-3 px-3'>
                            <span className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Home</span>
                        </div>
                        </Link>
                        <div className='flex items-center ml-auto space-x-6'>
                            <Link to="/login"><button className='font-semibold text-[15px] border-none outline-none'>
                                <span className='text-[#007bff] hover:underline'>Login</span></button></Link>
                            <Link to="/signup"> <button
                                className='px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Sign up
                            </button>
                            </Link>
                        </div>
                    </div>
                </header>
            </>
        )
        }
    </>);
}
