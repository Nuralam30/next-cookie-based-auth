import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [ name, setName ] = useState("Nura Alam");
    const [ email, setEmail ] = useState("nur23@gmail.com");
    const [ password, setPassword ] = useState("1234567");
    const [ cPassword, setCpassword ] = useState("1234567");

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        if(password === cPassword) {
            const newUser = {
                name,
                email,
                password
            }
            const response = await axios.post('http://127.0.0.1:8000/api/register', newUser);
            console.log('response data ', response.data)
        }else{
            window.alert('Password doesnot match');
        }
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

                    <button type='submit' className='btn w-100 btn-primary'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;