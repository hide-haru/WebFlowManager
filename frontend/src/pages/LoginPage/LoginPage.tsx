import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TextInput from '../../components/TextInput'
import Button from '../../components/Button'

import './LoginPage.module.css'
import styles from './LoginPage.module.css'

type alert = {
    success: boolean;
    message: string;
};

export default function LoginPage() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState<alert>({
        success: true,
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
            userId: userId,
            password: password
        };

        const response = await fetch(
            "http://localhost:8080/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
                credentials: "include"
            }
        )

        const data = await response.json();

        if (data.success) {
            navigate("/calendar");
        } else {
            setIsVisible({
                ...isVisible,
                success: false,
                message: data.message
                }
            );
        }
    }

    return (
        <div className={styles.loginPage}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <h1 className={styles.h1}><span>WebFlow Manager</span></h1>

                    <TextInput
                        label="ユーザーID"
                        name="userId"
                        value={ userId }
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        className1={styles.label}
                        className3={styles.input}
                    />

                    <TextInput
                        type="password"
                        name="password"
                        label="パスワード"
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className1={styles.label}
                        className3={styles.input}
                    />

                    <Button
                        name="ログイン"
                        className1={styles.button}
                    />
                </div>

                {isVisible
                    ?   <div className={styles.alert}>
                            {isVisible.message}
                        </div>
                    : ""}
            </form>
        </div>
    );
}
