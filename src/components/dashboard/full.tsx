import type { FC } from 'hono/jsx';
import * as schema from 'db/schema';
import { RecentFiles } from './recent_files';
import { Topbar } from './topbar';
import { FoldersList } from './folders_list';
import { UsageCards } from './usage_cards';

type DashboardProps = {
    user: schema.UserJwtPayload;
    folders: Array<schema.BarnFolder>;
    recentFiles: Array<schema.BarnFile>;
    usageData: schema.UsageData;
};

export const Dashboard: FC<DashboardProps> = ({
    user,
    folders,
    recentFiles,
    usageData,
}) => {
    return (
        <>
            <Topbar user={user} />
            <RecentFiles recentFiles={recentFiles} />
            <FoldersList folders={folders} />
            <UsageCards usageData={usageData} />
        </>
    );
};
