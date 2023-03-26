import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password)
    }

    return (
        <div>
            <h1 className='jumbotron text-center bg-primary'>Login page</h1>

            <div className="container p-2 pt-4 pb-4 col-md-4 offset-md-4">
                <form onSubmit={handleSubmit}>
                    <input 
                        className='form-control mb-4' 
                        type="email" 
                        placeholder='abc@gmail.com' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />

                    <input 
                        className='form-control mb-4' 
                        type="password" 
                        placeholder='Enter password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />

                    <button className='btn w-100 btn-primary'>Login</button>
                </form>
                <p className="text-center pt-4">Not registered ? <Link href='/register'>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;