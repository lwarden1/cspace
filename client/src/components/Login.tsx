import React from 'react'
import styles from '@css/Login.module.css';
import { axios } from '@/axios';
import { redirect, Form, ActionFunction, Link } from 'react-router-dom';
import { zUser, zodObjErrMsg, zUsername, zPassword, dynFieldOnChange } from '@/utils';

// maybe use react-hook-form or something in the future
export const loginAction: ActionFunction = async ({ request }) => {
    // You could keep track of field validity with onChange, but we might as well just validate the whole form just in case
    const v = await request.formData().then((d) => zUser.safeParse(d));
    if (!v.success) {
        console.log(`login failed: ${v.error}`)
        document.getElementById('form_error')!.innerText = zodObjErrMsg(v.error);
        return null;
    }
    return await axios.post('/login', v.data).then((r) => {
        return redirect('/');
    }).catch((err) => {
        console.log('login failed')
        console.error(err);
        document.getElementById('form_error')!.innerText = 'Username or password is incorrect';
        return null;
    })
}


export default function Login() {
    const [errUsername, setErrUsername] = React.useState<string>('')
    const [errPassword, setErrPassword] = React.useState<string>('')
    return (
        <div className={styles['auth__form-container']}>
            <div className={styles['auth__form-container_fields']}>
                <div className={styles['auth__form-container_fields-content']}>
                    <p>Login</p>
                    <Form method="post">
                        <div className={styles["auth__form-container_fields-content_input"]}>
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                aria-label="Username"
                                type="text"
                                placeholder="Username"
                                autoComplete='username'
                                required
                                onChange={dynFieldOnChange(setErrUsername, zUsername)}
                            />
                            <p style={{ fontSize: 12, color: 'red' }}>{errUsername}</p>
                        </div>
                        <div className={styles["auth__form-container_fields-content_input"]}>
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                aria-label="Password"
                                type="password"
                                placeholder="Password"
                                autoComplete='current-password'
                                required
                                onChange={dynFieldOnChange(setErrPassword, zPassword)}
                            />
                            <p style={{ fontSize: 12, color: 'red' }}>{errPassword}</p>
                        </div>
                        <p id='form_error' style={{ fontSize: 12, color: 'red' }}></p>
                        <div className={`${styles['auth__form-container_fields-content_button']} button`}>
                            <button type="submit">Login</button>
                        </div>
                        <div>
                            <Link to="/register">Don't have an account? Click here to register.</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
