import { Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu/SideMenu'

import styles from './MainLayout.module.css'

type MainLayoutProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainLayout = ({isOpen, setIsOpen}: MainLayoutProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [, setCheckingSession] = useState(true);

    useEffect(() => {
        setCheckingSession(true);

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/session/check`, {
            credentials: "include"
        })
        .then(response => {
            if (response.status === 401) {
                navigate("/", { replace: true });
                return;
            }

            if (!response.ok) {
                throw new Error("セッション確認に失敗しました");
            }

            setCheckingSession(false);
        })
        .catch(error => {
            console.error(error);
            setCheckingSession(false);
        });
    }, [location.pathname])

    return (
        <>
            <SideMenu
                isMenuOpen={isOpen}
                setIsMenuOpen={setIsOpen}
            />
                
            <main className={isOpen ? styles.mainOpen : styles.mainClose}>
                <Outlet context={{isOpen}} />
            </main>
        </>
    );
};

export default MainLayout;
