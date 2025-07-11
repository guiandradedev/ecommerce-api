export interface ResponseAdapter<T> {
    id: string,
    attributes: T,
    links: {
        self: string
    },
}