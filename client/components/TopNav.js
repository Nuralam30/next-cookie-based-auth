
import { useState, useEffect, useContext } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';
import { Context } from '../context';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Item } = Menu; // Menu.Item

const TopNav = () => {
    const [current, setCurrent] = useState("");
    const {state, dispatch} = useContext(Context);

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
    }, [process.browser && window.location.pathname])


    const logout = async () => {
        dispatch({type: "LOGOUT"})
        window.localStorage.removeItem('user')
        const {data} = await axios.get('/api/logout')
        toast.success(data.message)
    }

    return (
        <Menu mode='horizontal' selectedKeys={[current]}>
            <Item 
            key='/'
            onClick={e => setCurrent(e.key)}
            icon={<HomeOutlined />}>
                <Link href='/'>Home</Link>
            </Item>

            <Item 
            key='/login'
            onClick={e => setCurrent(e.key)}
            icon={<LoginOutlined />}>
                <Link href='/login'>Login</Link>
            </Item>

            <Item 
            key='/register'
            onClick={e => setCurrent(e.key)}
            icon={<UserAddOutlined />}>
                <Link href='/register'>Register</Link>
            </Item>

            {
            state.user ? 
            <Item onClick={logout} icon={<LogoutOutlined />} className='float-right'>Logout</Item>
             : ""}
            
        </Menu>
    );
};

export default TopNav;