import { Router } from "express";
import { User } from "../models/User";


class UserInput {
    public first_name!:string;
}

export const create = (payload: User): Promise<User> => {
    return User.create(payload)
}
// export const update = (id: number, payload: Partial<User>): Promise<User> => {
//     return User.update(payload)
// }
// export const getById = (id: number): Promise<User> => {
//     return ingredientDal.getById(id)
// }
// export const deleteById = (id: number): Promise<boolean> => {
//     return ingredientDal.deleteById(id)
// }
// export const getAll = (filters: GetAllIngredientsFilters): Promise<User[]> => {
//     return ingredientDal.getAll(filters)
// }