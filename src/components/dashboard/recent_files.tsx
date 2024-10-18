import type { FC } from 'hono/jsx';
import { css } from 'hono/css';
import { COLORS } from 'lib/constants';
import * as schema from 'db/schema';
import { format } from 'date-fns';
import { getFileIconPath } from 'lib/util';

const styles = {
    section: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        ul {
            display: grid;
            gap: 1rem;
            list-style: none;
            padding: 0;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-template-rows: 1fr;
        }
    `,
    fileCard: css`
        display: flex;
        color: ${COLORS.TEXT_DARK};
        text-decoration: unset;
        font-size: 0.875rem;
        border: 2px solid ${COLORS.BORDER};
        padding: 1rem;
        gap: 1rem;
        transition: all 0.05s ease-in-out;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
            border-color: ${COLORS.PRIMARY};
            background-color: ${COLORS.LIGHT_LAYER};

            p {
                color: ${COLORS.TEXT_DARK};
            }
        }

        &:active {
            background-color: ${COLORS.LIGHT_GRAY};
        }

        div {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    `,
    fileCardIcon: css`
        padding: 1rem;
    `,
    fileCardTitle: css`
        font-weight: 600;
        color: ${COLORS.TEXT_DARK};
        flex: 1;
        overflow: hidden;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 120px;
    `,
    fileCardDate: css`
        font-size: 0.75rem;
        color: ${COLORS.TEXT_MEDIUM};
    `,
    fileCardSize: css`
        font-size: 0.75rem;
        color: ${COLORS.TEXT_MEDIUM};
    `,
};

type RecentFilesProps = {
    recentFiles: Array<schema.BarnFile>;
};

function FileCard({ file }: { file: schema.BarnFile }) {
    return (
        <a href={`/files/${file.id}`} className={styles.fileCard}>
            <img
                src={`/static/img/${getFileIconPath(file.name)}.svg`}
                alt="File"
                width={24}
            />
            <div>
                <p className={styles.fileCardTitle}>{file.name}</p>
                <p className={styles.fileCardDate}>
                    {format(new Date(file.created_at), 'P')}
                </p>
                <p className={styles.fileCardSize}>
                    {Number(file.size / 1000).toFixed(2)} KB
                </p>
            </div>
        </a>
    );
}

export const RecentFiles: FC<RecentFilesProps> = ({ recentFiles }) => {
    return (
        <section className={styles.section}>
            <h2>Latest Files</h2>
            <ul>
                {recentFiles.map((file) => (
                    <FileCard key={file.id} file={file} />
                ))}
            </ul>
        </section>
    );
};
