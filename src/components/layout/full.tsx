import type { FC, PropsWithChildren } from 'hono/jsx';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { css } from 'hono/css';
import { COLORS } from 'lib/constants';

type LayoutProps = {
    title: string;
    path: string;
};

const styles = {
    bodyContainer: css`
        display: flex;
        flex: 1;
        color: ${COLORS.TEXT_DARK};
    `,
    main: css`
        flex: 1;
        max-height: calc(100vh - 74px);
        overflow-y: auto;
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
