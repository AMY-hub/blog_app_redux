import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Button, ErrorMessage } from '../../../components';
import { registerUser } from '../user.actions';
import { selectUserState } from '../user.slice';
import { RegisterFormFields } from '../user.types';

import styles from './style.module.scss';

export const SighUpForm = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(selectUserState);
    const navigate = useNavigate();

    const handleSignUp: FormEventHandler<HTMLFormElement & RegisterFormFields> = (e) => {
        e.preventDefault();
        const { email, password, name } = e.currentTarget;

        dispatch(registerUser({
            email: email.value,
            password: password.value,
            name: name.value
        })).unwrap()
            .then(() => navigate('/'))
            .catch((err: Error) => console.log(err.message));
    }

    return (
        <>
            {error && <ErrorMessage text={error} />}
            <form onSubmit={handleSignUp}
                className={styles.signup__form}>
                <label>
                    <p>Enter your name:</p>
                    <input
                        type='text'
                        name='name'
                        required />
                </label>
                <label>
                    <p>Enter your email:</p>
                    <input
                        type='email'
                        name='email'
                        required />
                </label>
                <label>
                    <p>Enter your password:</p>
                    <input
                        type='password'
                        name='password'
                        required
                        minLength={6} />
                </label>
                <Button
                    as='button'
                    withLoading={true}
                    loading={loading}
                    styleType='primary'
                    size='l'
                    className={styles.signup__submit}>
                    Sign up
                </Button>
            </form>
        </>)
}