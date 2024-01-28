import { UserMySqlEntity } from "@database"
import { AuthToken } from "../enums"

export default interface ValidatedResult {
  user: UserMySqlEntity;
  type: AuthToken;
}
