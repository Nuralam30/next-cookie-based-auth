
import { useState, useEffect, useContext } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { 
    HomeOutlined, 
    LoginOutlined, 
    LogoutOutlined, 
    UserAddOutlined,
    SettingOutlined,
    CoffeOutlined
} from '@ant-design/icons';
import { Context } from '../context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const { Item, SubMenu } = Menu; // Menu.Item

const TopNav = () => {
    const [current, setCurrent] = useState("");
    const {state, dispatch} = useContext(Context);
    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
    }, [process.browser && window.location.pathname])


    const logout = async () => {
        dispatch({type: "LOGOUT"})
        window.localStorage.removeItem('user')
        const {data} = await axios.get('/api/logout')
        router.push('/login')
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

            {
                !user ? <>
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
                </>
                :
                <SubMenu title={user.name} className='user-dashboard'>
                    <Item 
                    key='/dashboard'
                    onClick={e => setCurrent(e.key)} 
                    icon={<SettingOutlined />}>
                        <Link href='/dashboard'> Dashboard </Link>
                    </Item>

                    <Item 
                    onClick={logout} 
                    icon={<LogoutOutlined />}>
                        LogOut
                    </Item>
                </SubMenu>
            }
            
        </Menu>
    );
};

export default TopNav;