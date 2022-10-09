import { Link, useNavigate } from 'react-router-dom';
import { Button } from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectAccessToken, selectUserData } from '../../features/user/user.slice';
import { ReactComponent as Logo } from './web.svg';

import styles from './style.module.scss';

export const Header = () => {

    const navigate = useNavigate();
    const userInfo = useAppSelector(selectUserData);
    const token = useAppSelector(selectAccessToken);
    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__logo}>
                    <Logo className={styles.logo} />
                    <Link to='/' className={styles.header__name}>
                        WebInfo
                    </Link>
                </div>
            </div>
            <div className={styles.header__user}>
                {userInfo?.name &&
                    <p className={styles.header__greeting}>{`Hello, ${userInfo.name}!`}</p>}
                {token ?
                    <Button
                        as='button'
                        styleType='light'
                        size='l'
                        onClick={() => dispatch(logout())}
                    >Logout
                    </Button>
                    :
                    <Button
                        as='button'
                        size='xl'
                        onClick={() => navigate('/login')}
                        className={styles.login_link}
                    >Login</Button>
                }
            </div>
        </header>
    )
}
