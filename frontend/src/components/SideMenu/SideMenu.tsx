import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './SideMenu.module.css'

type pageName = {
    id: number;
    pageId: number;
    pageName: string;
    pagePath: string;
}

type Props = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideMnu({
    isMenuOpen,
    setIsMenuOpen
}: Props) {

    const navigate = useNavigate();
    const [getPageNames, setGetPageNames] = useState<pageName[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getpagename`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            const pageName = data.map((pagename: any) => ({
                id: pagename.id,
                pageId: pagename.pageId,
                pageName: pagename.pageName,
                pagePath: pagename.pagePath
            }))

            setGetPageNames(pageName);
        })
    }, [])

    return (
        <>
            {isMenuOpen && (
                <aside className={styles.sideMenu}>
                    <h2>WebFlow Manager</h2>
                    <button className={styles.closeMenu}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ≫
                    </button>
                    {getPageNames.map((getPageName) => (
                        <nav  key={getPageName.pageId}>
                            <button onClick={() => navigate(getPageName.pagePath)}>
                                {getPageName.pageName}
                            </button>
                        </nav>
                    ))}
                </aside>
            )}

            {!isMenuOpen && (
                <button className={styles.openMenu}
                    onClick={() => setIsMenuOpen(true)}
                >
                    ≪
                </button>
            )}
        </>
    )
}
