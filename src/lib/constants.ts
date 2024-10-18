export const COLORS = {
    BORDER: 'rgb(210, 210, 210)',
    DARK_GRAY: 'rgba(0, 0, 0, 0.3)',
    LIGHT_GRAY: 'rgba(0, 0, 0, 0.1)',
    GRAY: 'rgba(0, 0, 0, 0.2)',
    LIGHT_LAYER: 'rgba(0, 0, 0, 0.05)',
    PRIMARY: 'hsl(220, 75%, 55%)',
    TEXT_LIGHT: 'rgba(255, 255, 255, 0.9)',
    TEXT_MEDIUM: 'rgba(0, 0, 0, 0.6)',
    TEXT_DARK: 'rgba(0, 0, 0, 0.8)',
    SUCCESS: 'hsl(137, 75%, 55%)',
} as const;

export const BARN_SIZE_LIMIT = 1073741824 as const;

export const BARN_FILE_TYPES: Record<string, string[]> = {
    file: ['doc', 'docx', 'pdf', 'pdt', 'odt', 'rtf', 'txt', 'md'],
    file_image: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'ico', 'svg', 'webp'],
    file_archive: ['zip', 'gz', 'tar', 'rar', '7z', 'cab', 'iso', 'xz', '7z'],
    file_music: ['mp3', 'wav', 'ogg', 'flac'],
    file_video: ['mp4', 'mov', 'mkv', 'webm', 'avi', 'mpeg', 'mpg', 'm4v'],
};
