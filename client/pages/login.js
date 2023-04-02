import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';

const Login = () => {

    const [email, setEmail] = useState("nur23@gmail.com");
    const [password, setPassword] = useState("1234567");
    const [loading, setLoading] = useState(false);

    // state value
    const {state, dispatch} = useContext(Context);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (email, password) {
                const user = {
                    email,
                    password
                }
                const response = await axios.post('/api/login', user)

                dispatch({type: 'LOGIN', payload: response.data})
                window.localStorage.setItem('user', JSON.stringify(response.data))
                router.push('/')

            } else {
                window.alert('email or password cannot be empty')
            }

            toast.success('Login successful.')
            setLoading(false)

        } catch (err) {
            toast.error(err)
            setLoading(false)
        }

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

                    <button
                        type='submit'
                        className='btn w-100 btn-primary'
                        disabled={!email || !password || loading}
                    >
                        {loading ? <SyncOutlined spin /> : "Login"}
                    </button>
                </form>
                <p className="text-center pt-4">Not registered ? <Link href='/register'>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;