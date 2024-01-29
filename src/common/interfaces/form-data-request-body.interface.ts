export default interface FormDataRequestBody<T extends object> {
    data: T,
    files: Express.Multer.File[]
}