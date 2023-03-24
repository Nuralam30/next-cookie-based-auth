import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';

const Register = () => {

    const [ name, setName ] = useState("Nura Alam");
    const [ email, setEmail ] = useState("nur23@gmail.com");
    const [ password, setPassword ] = useState("1234567");
    const [ cPassword, setCpassword ] = useState("1234567");
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        try {
            setLoading(true);
            if(password === cPassword) {
                const newUser = {
                    name,
                    email,
                    password
                }
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, newUser);
            }else{
                window.alert('Password doesnot match');
            }
            toast.success('Registration successful. please login')
            setLoading(false)

        } catch(err) {
            toast.error(err.response.data)
            setLoading(false)
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

                    <button 
                    type='submit' 
                    className='btn w-100 btn-primary'
                    disabled={!name || !email || !password || loading}
                    >
                        {loading ? <SyncOutlined spin /> : "Register" }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;