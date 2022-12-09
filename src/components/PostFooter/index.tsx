import { useAppSelector } from '../../app/hooks';
import { selectUserData } from '../../features/user/user.slice';
import { formatDateTime } from '../../utils/formatDateTime';
import { Button } from '../Button';
import { PostFooterProps } from './postFooter.props';

import styles from './style.module.scss';

export const PostFooter: React.FC<PostFooterProps> = ({ author, topic, createdAt, id, authorId }) => {

    const user = useAppSelector(selectUserData);

    return (
        <div className={styles.footer}>
            <div className={styles.info_wrapper}>
                <span>{`Author: ${author}`}</span>
                <span>{`Topic: ${topic}`}</span>
            </div>
            <div className={styles.info_wrapper}>
                {
                    (authorId === user?.id) &&
                    <Button
                        as='Link'
                        to={`/editpost/${id}`}
                        styleType='plain'
                        className={styles.footer__edit}
                    >Edit post
                    </Button>
                }
                <span>
                    {`Date: ${formatDateTime(createdAt, 'en', 'date')}`}
                </span>
            </div>
        </div>
    );
};
