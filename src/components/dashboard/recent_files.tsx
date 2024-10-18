import type { FC } from 'hono/jsx';
import { css } from 'hono/css';
import { colors } from 'constants.ts';
import * as schema from 'db/schema';
import { format } from 'date-fns';

const styles = {
    section: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;

        ul {
            display: grid;
            gap: 0.5rem;
            list-style: none;
            padding: 0;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            grid-template-rows: 1fr;
        }
    `,
    fileCard: css`
        display: flex;
        color: ${colors.TEXT_DARK};
        text-decoration: unset;
        font-size: 0.875rem;
        background-color: ${colors.LIGHT_LAYER};
        border: 2px solid ${colors.BORDER};
        padding: 1rem;
        gap: 1rem;

        &:hover {
            background-color: ${colors.LIGHT_GRAY};
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
        color: ${colors.DARK_GRAY};
        flex: 1;
    `,
    fileCardDate: css`
        font-size: 0.75rem;
        color: ${colors.GRAY};
    `,
    fileCardSize: css`
        font-size: 0.75rem;
        color: ${colors.GRAY};
    `,
};

type RecentFilesProps = {
    recentFiles: Array<schema.BarnFile>;
};

function FileCard({ file }: { file: schema.BarnFile }) {
    return (
        <a href={`/files/${file.id}`} className={styles.fileCard}>
            <img src="/static/img/file.svg" alt="File" width={24} />
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
