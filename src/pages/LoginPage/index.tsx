import { useState } from 'react';
import cn from 'classnames';
import { SighInForm } from '../../features/user/SignInForm';
import { SighUpForm } from '../../features/user/SignUpForm';
import { Button } from '../../components';

import styles from './style.module.scss';

export const LoginPage = () => {

    const [option, setOption] = useState<'signin' | 'signup'>('signin');

    return (
        <section className={styles.login}>
            <div className={styles.options}>
                <Button
                    styleType='light'
                    size='xl'
                    className={cn(styles[option], {
                        [styles.active]: option === 'signin'
                    })}
                    onClick={() => setOption('signin')}
                >Sign in
                </Button>
                <Button
                    size='xl'
                    className={cn(styles[option], {
                        [styles.active]: option === 'signup'
                    })}
                    onClick={() => setOption('signup')}
                >Sign up</Button>
            </div>
            {
                option === 'signin' ?
                    <SighInForm />
                    :
                    <SighUpForm />
            }
        </section>
    );
};
