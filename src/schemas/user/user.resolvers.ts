import { UserService } from "../../services/user.service";
import { UserFilter } from "../../types/user.types";

type UserFilterArg = { filter: UserFilter }

export const UserResolvers = {
  Query: {
    users(_: never, { filter }: UserFilterArg) {
      return UserService.getInstance().getAll(filter)
    },
  }
};