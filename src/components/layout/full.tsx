import type { FC, PropsWithChildren } from 'hono/jsx';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { css } from 'hono/css';
import { colors } from 'constants.ts';

type LayoutProps = {
    title: string;
    path: string;
};

const styles = {
    bodyContainer: css`
        display: flex;
        flex: 1;
        color: ${colors.TEXT_DARK};
    `,
    main: css`
        flex-direction: column;
        flex: 1;
    `,
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
    title,
    path,
    children,
}) => {
    if (path === '/login') {
        return <main>{children}</main>;
    }

    return (
        <>
            <Header title={title} />
            <div className={styles.bodyContainer}>
                <Sidebar path={path} />
                <main className={styles.main}>{children}</main>
            </div>
        </>
    );
};
