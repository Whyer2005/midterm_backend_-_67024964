import type {UserCreateDto, UserDto} from "../dto/user.dto.js";

export interface IUserService {

    findAllUser() : Promise<UserDto[]>
    create(userDto : UserCreateDto) : Promise<UserDto>
}