import type { FC } from 'hono/jsx';
import { css } from 'hono/css';
import * as schema from 'db/schema';
import { COLORS, BARN_SIZE_LIMIT } from 'lib/constants';
import { formatBytes } from 'lib/util';
import { format } from 'date-fns';

const styles = {
    card: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        padding: 2rem;
        background-color: black;
        color: ${COLORS.TEXT_LIGHT};

        span:first-of-type {
            font-size: 1.25rem;
        }

        span:not(:first-child) {
            font-size: 0.75rem;
            color: ${COLORS.TEXT_LIGHT};
        }

        p {
            font-size: 0.75rem;
            color: ${COLORS.TEXT_LIGHT};
        }

        div {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            justify-content: space-between;
        }
    `,
    cardGrid: css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 1rem;
        padding: 1rem;
    `,
    cardDate: css`
        font-size: 0.75rem;
        color: ${COLORS.TEXT_LIGHT};
    `,
    usageBar: css`
        width: 100%;
        max-height: 0.75rem;
        border: 2px solid ${COLORS.BORDER};
        border-radius: 0.5rem;
        position: relative;

        div {
            height: 100%;
            background-color: ${COLORS.TEXT_LIGHT};
            z-index: 10;
            border-radius: 0.5rem;
        }
    `,
    section: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        background-color: ${COLORS.LIGHT_GRAY};
        margin-top: 1rem;
        justify-self: flex-end;

        div {
            flex: 1;
        }
    `,
};

type UsageCardsProps = {
    usageData: schema.UsageData;
};

export const UsageCards: FC<UsageCardsProps> = ({ usageData }) => {
    return (
        <section className={styles.section}>
            <h2>Your statistics</h2>
            <div className={styles.cardGrid}>
                <div className={styles.card}>
                    <span>
                        <strong>{usageData.totalFiles}</strong>
                    </span>
                    <span>total file(s)</span>
                </div>
                <div className={styles.card}>
                    <span>
                        <strong>{usageData.totalFolders}</strong>
                    </span>
                    <span>total folder(s)</span>
                </div>
                <div className={styles.card}>
                    <section>
                        <span>
                            <strong>
                                {formatBytes(Number(usageData.totalSize))}
                            </strong>
                        </span>
                        <span>/</span>
                        <span>
                            <strong>{formatBytes(BARN_SIZE_LIMIT)}</strong>
                        </span>{' '}
                        <span>used</span>
                    </section>
                    <div className={styles.usageBar}>
                        <div
                            style={{
                                width: `${(usageData.totalSize / BARN_SIZE_LIMIT) * 100}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div>
                        <p>Most recent file:</p>
                        <span>
                            <strong>{usageData.mostRecentFile?.name}</strong>
                        </span>
                        <span className={styles.cardDate}>
                            {format(
                                new Date(
                                    usageData.mostRecentFile?.created_at ||
                                        Date.now()
                                ),
                                'P'
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
