import { Hono } from 'hono';
import type { FC } from 'hono/jsx';
import * as schema from 'db/schema';
import { Auth } from 'auth';
import { HTTPException } from 'hono/http-exception';
import { query } from 'db/db';
import { eq } from 'drizzle-orm';
import { css } from 'hono/css';

type FoldersIndexProps = {
    folders: Array<schema.BarnFolder & { files: Array<schema.BarnFile> }>;
};

const listStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`;

const FoldersList: FC<FoldersIndexProps> = ({ folders }) => {
    return (
        <>
            <ul>
                {folders.map((folder) => (
                    <li className={listStyle}>
                        <h3>{folder.name}</h3>
                        <p>{folder.files.length} files</p>
                        <a href={`folders/${folder.id}`}>{folder.id}</a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export const folders = new Hono<{ Variables: schema.Variables }>();

folders.use(Auth.middleware);
folders.get('/', async (c) => {
    const userId = c.get('jwtPayload').id;
    try {
        const foundFolders = await query.folders.findMany({
            where: eq(schema.folders.owner_id, userId),
            with: {
                files: true,
            },
        });
        return c.render(<FoldersList folders={foundFolders} />);
    } catch (e) {
        console.error(e);
        throw new HTTPException(500);
    }
});

export default folders;
