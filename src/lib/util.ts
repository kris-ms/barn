import { BARN_FILE_TYPES } from './constants';

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
        'Bytes',
        'KiB',
        'MiB',
        'GiB',
        'TiB',
        'PiB',
        'EiB',
        'ZiB',
        'YiB',
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getFileIconPath(file: string) {
    const extension = file.split('.').pop() || '.txt';

    const iconPath = Object.keys(BARN_FILE_TYPES).find((key) => {
        return BARN_FILE_TYPES[key].includes(extension);
    });

    return iconPath || 'file';
}
