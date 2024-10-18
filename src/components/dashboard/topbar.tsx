import type { FC } from 'hono/jsx';
import { css } from 'hono/css';
import { COLORS } from 'lib/constants';
import * as schema from 'db/schema';
import { format } from 'date-fns';

const styles = {
    topbar: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        color: ${COLORS.TEXT_MEDIUM};
        font-weight: 500;
        border-bottom: 2px solid ${COLORS.BORDER};
        gap: 1rem;

        div {
            display: flex;
            font-size: 0.75rem;
            background-color: black;
            color: ${COLORS.TEXT_LIGHT};
            justify-content: space-between;
            border-radius: 2rem;
            align-items: center;
            font-weight: 500;
            padding: 0.75rem;
            gap: 0.5rem;
        }

        div span {
            font-weight: bold;
        }

        div p,
        div span {
            @media (max-width: 600px) {
                display: none;
            }
        }

        div > div {
            justify-self: flex-start;
            min-width: 12px;
            min-height: 12px;
            max-width: 12px;
            max-height: 12px;
            border-radius: 100%;
            background-color: ${COLORS.SUCCESS};
            padding: 0;
        }
    `,
};

type TopbarProps = {
    user: schema.UserJwtPayload;
};

export const Topbar: FC<TopbarProps> = ({ user }) => {
    return (
        <section className={styles.topbar}>
            <p>Welcome, {user.name}!</p>
            <div>
                <div />
                <span>Last updated: </span>
                <p>{format(new Date(), 'Pp')}</p>
            </div>
        </section>
    );
};
