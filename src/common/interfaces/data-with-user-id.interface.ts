export default interface DataWithUserId<T extends object> {
    userId: string,
    data: T
}
