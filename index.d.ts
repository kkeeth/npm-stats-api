export type ErrorType = {
    message: string;
    name: string;
    statusCode: number;
    body: unknown;
};

// Specific error body types for type guards
export type ApiErrorBody = {
    path: string;
    error: string;
};

export type NetworkErrorBody = {
    code: string;
    errno: number;
    hostname: string;
    message: string;
    response: undefined;
    syscall: string;
};
export type StatType = Promise<{
    statusCode: number;
    body: {
        downloads: number;
        start: string;
        end: string;
        package: string;
    };
}>;
export type DetailType = Promise<{
    statusCode: number;
    body: object;
}>;
export declare const stat: (pkg: string, start: string, end: string) => StatType;
export declare const details: (pkg: string) => DetailType;
