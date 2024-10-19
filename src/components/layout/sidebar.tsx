import type { FC } from 'hono/jsx';
import { css } from 'hono/css';
import { COLORS } from 'lib/constants';

const styles = {
    sidebar: css`
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-right: 2px solid ${COLORS.BORDER};
        width: 240px;
        position: sticky;
        left: 0;

        @media screen and (max-width: 768px) {
            display: none;
        }
    `,
    sidebarSection: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 2px solid ${COLORS.BORDER};
    `,
    new: css`
        align-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        border: 2px solid ${COLORS.BORDER};
        border-radius: 4rem;
        color: unset;
        text-decoration: unset;
        min-width: 160px;
        font-size: 14px;
        font-weight: 600;
        transition:
            background-color 0.1s ease-in-out,
            border-color 0.1s ease-in-out;

        &:hover {
            background-color: ${COLORS.LIGHT_GRAY};
            border-color: ${COLORS.PRIMARY};
        }
    `,
    navList: css`
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;
    `,
    navLink: css`
        display: flex;
        align-items: center;
        gap: 2rem;
        padding: 1rem;
        color: unset;
        text-decoration: unset;
        font-size: 0.875rem;
        font-weight: 600;
        border-bottom: 2px solid ${COLORS.BORDER};
        transition: background-color 0.1s ease-in-out;

        &:hover {
            background-color: ${COLORS.LIGHT_LAYER};
        }

        &:active {
            background-color: ${COLORS.LIGHT_GRAY};
        }
    `,

    selectedLink: css`
        background-color: rgba(0, 0, 0, 1);
        color: ${COLORS.TEXT_LIGHT};

        &:hover {
            background-color: rgba(0, 0, 0, 1);
        }

        img {
            filter: invert(1);
        }
    `,
};

type SidebarProps = {
    path: string;
};

const navLinks = [
    {
        name: 'My Barn',
        path: '/',
        icon: '/static/img/folder.svg',
    },
    {
        name: 'Share a Folder',
        path: '/folders',
        icon: '/static/img/share.svg',
    },
];

export const Sidebar: FC<SidebarProps> = ({ path }) => {
    return (
        <aside className={styles.sidebar}>
            <section className={styles.sidebarSection}>
                <a href="/upload" className={styles.new}>
                    <img
                        src="/static/img/add_circle_outline.svg"
                        alt="Add file"
                        width={24}
                    />
                    <span>Add File</span>
                </a>
            </section>

            <nav>
                <ul className={styles.navList}>
                    {navLinks.map((link) => {
                        const isActive = link.path === path;
                        return (
                            <li key={link.path}>
                                <a
                                    href={link.path}
                                    className={css`
                                        ${styles.navLink}
                                        ${isActive && styles.selectedLink}
                                    `}
                                >
                                    {link.icon && (
                                        <img
                                            src={link.icon}
                                            alt={link.name}
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    <span>{link.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};
