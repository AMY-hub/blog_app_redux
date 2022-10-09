import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loginUser } from '../user.actions';
import { selectUserState } from '../user.slice';
import { Button, ErrorMessage } from '../../../components';

import styles from './style.module.scss';
import { LoginFormFields } from '../user.types';

export const SighInForm = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(selectUserState);
    const navigate = useNavigate();

    const handleSignIn: FormEventHandler<HTMLFormElement & LoginFormFields> = (e) => {
        e.preventDefault();
        const { email, password } = e.currentTarget;
        dispatch(loginUser({
            email: email.value,
            password: password.value
        })).unwrap()
            .then(() => navigate('/'))
            .catch((err: Error) => console.log(err.message));
    }

    return (
        <>
            {error && <ErrorMessage text={error} />}
            <form onSubmit={handleSignIn}
                className={styles.signin__form}>
                <label>
                    <p>Enter your email:</p>
                    <input
                        type='email'
                        name='email'
                    />
                </label>
                <label>
                    <p>Enter your password:</p>
                    <input
                        type='password'
                        name='password'
                        minLength={6} />
                </label>
                <Button
                    as='button'
                    withLoading={true}
                    loading={loading}
                    styleType='light'
                    size='l'
                    className={styles.signin__submit}>
                    Sign in
                </Button>
            </form>
        </>
    )
}
