import type { FC } from 'hono/jsx';
import { css } from 'hono/css';
import { COLORS } from 'lib/constants';

type HeaderProps = {
    title: string;
};

const styles = {
    header: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid ${COLORS.BORDER};
        box-shadow: 0px 1px 6px ${COLORS.GRAY};
        z-index: 10;
        height: 74px;
        position: sticky;
        top: 0;
        background-color: #fff;
    `,
    headerLogo: css`
        object-fit: cover;
        transition: opacity 0.2s;
        min-width: 72px;

        &:hover {
            opacity: 0.85;
        }
    `,
    headerSection: css`
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    `,
    headerRightSection: css`
        justify-content: flex-end;
        @media screen and (max-width: 480px) {
            justify-content: space-evenly;
        }
    `,
    headerTitle: css`
        font-size: 1rem;
        font-weight: 500;
        color: ${COLORS.TEXT_DARK};
        cursor: default;

        @media screen and (max-width: 768px) {
            display: none;
        }
    `,
    headerSearch: css`
        flex: 1;
        padding: 0.75rem 1rem;
        border-radius: 4rem;
        border: 2px solid ${COLORS.BORDER};
        outline: none;
        font-size: 14px;
        padding-left: 3rem;

        &:focus {
            border-color: ${COLORS.PRIMARY};
        }

        &::placeholder {
            color: ${COLORS.TEXT_MEDIUM};
        }

        @media screen and (max-width: 480px) {
            display: none;
        }
    `,
    headerSearchIcon: css`
        position: fixed;
        margin-left: 1rem;
        opacity: 0.6;
        min-width: 24px;

        @media screen and (max-width: 480px) {
            position: relative;
            margin-left: 0;
            flex: 1;
            display: flex;
            justify-content: flex-end;
            padding-right: 1rem;
        }
    `,
    headerSettingsIcon: css`
        opacity: 0.6;
        min-width: 24px;
    `,
    headerProfile: css`
        border-radius: 100%;
        width: 32px;
        height: 32px;
        background: linear-gradient(
            45deg,
            hsl(180, 70%, 60%),
            hsl(240, 70%, 80%)
        );
        margin-right: 1rem;
    `,
};

export const Header: FC<HeaderProps> = ({ title }) => {
    return (
        <header className={styles.header}>
            <section className={styles.headerSection}>
                <a href="/">
                    <img
                        src="/static/img/barn_logo_simple.png"
                        alt="barn logo"
                        height={72}
                        className={styles.headerLogo}
                    />
                </a>
                <h1 className={styles.headerTitle}>{title}</h1>
            </section>
            <section className={styles.headerSection}>
                <span className={styles.headerSearchIcon}>
                    <img src="/static/img/search.svg" alt="Search" />
                </span>
                <input
                    type="text"
                    placeholder="Search for files..."
                    className={styles.headerSearch}
                />
            </section>
            <section
                className={css`
                    ${styles.headerSection}
                    ${styles.headerRightSection}
                `}
            >
                <a href="/settings" className={styles.headerSettingsIcon}>
                    <img src="/static/img/settings.svg" alt="Settings" />
                </a>
                <div className={styles.headerProfile}></div>
            </section>
        </header>
    );
};
