import React, { useState } from 'react';

const Register = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ cPassword, setCpassword ] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();
        console.table(name, email, password)
    }

    return (
        <div>
            <h1 className='jumbotron text-center bg-primary'>Register page</h1>

            <div className="container p-2 pt-4 pb-4 col-md-4 offset-md-4">
                <form onSubmit={handleSubmit}>
                    <input 
                        className='form-control mb-4' 
                        type="text" 
                        placeholder='Enter Your Name' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />

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

                    <input 
                        className='form-control mb-4' 
                        type="password" 
                        placeholder='Confirm password' 
                        value={cPassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        required 
                    />

                    <button className='btn w-100 btn-primary'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;