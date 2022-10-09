import cn from 'classnames';
import { Theme } from '../theme.types';
import { useTheme } from './useTheme';

import styles from './style.module.scss';

export const ThemeSwitcher = (): JSX.Element => {

  const [theme, setTheme] = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>, t: Theme) => {
    if (e.key === 'Enter') {
      setTheme(t);
    }
  }

  return (
    <div className={styles.theme_switcher}>
      <label
        onKeyDown={(e) => handleKeyDown(e, Theme.Light)}
        tabIndex={0}
        className={
          cn(styles.theme_switcher__light, 'icon-sun', {
            [styles.active]: theme === Theme.Light
          })
        }>
        <span className={styles.hidden}>Ligth theme</span>
        <input
          tabIndex={-1}
          type='radio'
          value='light'
          name='theme'
          className='hidden'
          onChange={() => setTheme(Theme.Light)}
        />
      </label>
      <label
        onKeyDown={(e) => handleKeyDown(e, Theme.Dark)}
        tabIndex={0}
        className={
          cn(styles.theme_switcher__dark, 'icon-moon', {
            [styles.active]: theme === Theme.Dark
          })
        }>
        <span className={styles.hidden}>Dark theme</span>
        <input
          tabIndex={-1}
          type='radio'
          value='dark'
          name='theme'
          className='hidden'
          onChange={() => setTheme(Theme.Dark)}
        />
      </label>
    </div>
  )
}

