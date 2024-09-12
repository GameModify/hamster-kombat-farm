export declare type TelegramID = number

export interface AccountInfo {
    id: number;
    telegramID: number; // Преобразуем из `telegram_id`
    username: string;
    nextStartTimestamp: number; // Преобразуем из `next_start_timestamp`
    cookie?: string;
    headers?: any; // Дополнительное поле, если оно необходимо
}
























