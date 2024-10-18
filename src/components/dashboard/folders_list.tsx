import type { FC } from 'hono/jsx';
import { css } from 'hono/css';
import * as schema from 'db/schema';
import { COLORS } from 'lib/constants';
import { format } from 'date-fns';

type FoldersListProps = {
    folders: Array<schema.BarnFolder>;
};

const styles = {
    section: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        ul {
            list-style: none;
            padding: 0;
            border: 2px solid ${COLORS.BORDER};
        }

        li {
            display: flex;
            gap: 1rem;
            align-items: center;
            border-bottom: 2px solid ${COLORS.BORDER};
        }

        li:last-child {
            border-bottom: none;
        }

        a {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
            padding: 0.75rem;
            transition: all 0.05s ease-in-out;
        }

        a:hover {
            background-color: ${COLORS.LIGHT_LAYER};
            outline: 2px solid ${COLORS.PRIMARY};
            color: ${COLORS.TEXT_DARK};

            span {
                color: ${COLORS.TEXT_DARK} !important;
            }
        }

        a:active {
            background-color: ${COLORS.LIGHT_GRAY};
        }

        a > * {
            flex: 1;
        }

        a > span {
            font-size: 0.875rem;
            color: ${COLORS.TEXT_DARK};
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        a > span:nth-child(3) {
            font-size: 0.75rem;
            text-align: center;
            color: ${COLORS.TEXT_MEDIUM};
            font-weight: 400;

            @media screen and (max-width: 768px) {
                display: none;
            }
        }

        a > span:last-child {
            color: ${COLORS.TEXT_MEDIUM};
            font-weight: 500;
            text-align: right;
        }

        a > img {
            max-width: 24px;
        }
    `,
};

export const FoldersList: FC<FoldersListProps> = ({ folders }) => {
    return (
        <section className={styles.section}>
            <h2>Folders</h2>
            <ul>
                {folders.map((folder) => (
                    <li key={folder.id}>
                        <a href={`/folders/${folder.id}`}>
                            <img
                                src="/static/img/folder.svg"
                                alt="Folder"
                                width={24}
                            />
                            <span>{folder.name}</span>
                            <span>
                                {format(new Date(folder.created_at), 'Pp')}
                            </span>
                            <span>{folder.files?.length || 0} files</span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};
