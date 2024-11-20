import { createContext, ReactNode, useEffect, useState } from "react";

export const Context = createContext<{
    email: string,
    enc_data: string,
    hash_data: string,
    login: Function, logout: Function, isAuthenticated: Function;
}>({
    email: '',
    enc_data: '',
    hash_data: '',
    login: () => { }, logout: () => { }, isAuthenticated: () => { }
});

const initial_state = {
    email: '',
    enc_data: '',
    hash_data: ''
};
export function Global({ children }: { children: ReactNode; }) {
    const [state, setState] = useState(initial_state);
    const login = (email: string, enc_data: string, hash_data: string) => {
        setState(() => ({ email, enc_data, hash_data }));
        localStorage.setItem('AUTH_STATE', JSON.stringify({ email, enc_data, hash_data }));
    };
    const logout = () => {
        setState(initial_state);
        localStorage.clear();

    };
    const isAuthenticated = () => {
        return state.email ? true : false;
    };
    useEffect(() => {
        const stored_state = localStorage.getItem('AUTH_STATE');
        if (stored_state) {
            setState(JSON.parse(stored_state));
        }
    }, []);
    return (
        <Context.Provider value={{
            email: state.email,
            enc_data: state.enc_data,
            hash_data: state.hash_data,
            login, logout, isAuthenticated
        }}>
            {children}
        </Context.Provider>
    );
}