import { UserResolvers, UserTypeDef } from "./user";

export const typeDefs = [UserTypeDef]
export const resolvers = Object.assign({}, UserResolvers)