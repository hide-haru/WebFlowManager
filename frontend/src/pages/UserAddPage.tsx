import { useState } from 'react'

import TextInput from '../components/TextInput'

type UserForm = {
    userId: string;
    name: string;
    password: string;
}

export default function UserAddPage() {

    const [userForm, setUserForm] = useState<UserForm>({
        userId: "",
        name: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userForm.userId === "" || userForm.name === "" || userForm.password ==="") {
            alert("未入力項目があります。")
            return;
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/useradd`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userForm)
            }
        )

        const data = await response.json();

        alert(data.message);
        if (data.success) {
            setUserForm({userId: "", name: "", password: ""});
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="ユーザID"
                    name="userId"
                    value={userForm.userId}
                    onChange={(e) => setUserForm({...userForm, userId: e.target.value})}
                />

                <TextInput
                    label="名前"
                    name="name"
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                />

                <TextInput
                    label="パスワード"
                    name="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                />

                <button>登録</button>
            </form>
        </div>
    )
}
