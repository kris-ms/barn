import type { FC } from 'hono/jsx';
import * as schema from 'db/schema';
import { RecentFiles } from './recent_files';

type DashboardProps = {
    user: schema.UserJwtPayload;
    folders: Array<schema.BarnFolder>;
    recentFiles: Array<schema.BarnFile>;
};

export const Dashboard: FC<DashboardProps> = ({
    user,
    folders,
    recentFiles,
}) => {
    return <RecentFiles recentFiles={recentFiles} />;
};
