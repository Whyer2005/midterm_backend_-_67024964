import type { IUserService } from "@repo/domain/service/user.js";
import  { type UserRepositorySqlite } from "../repository/sqlite/user.js";
import type {UserCreateDto, UserDto} from "@repo/domain/dto/user.dto.js";

export class UserService implements IUserService {
    constructor(private readonly userRepository: UserRepositorySqlite) {

    }
    findAllUser(): Promise<UserDto[]> {
        return this.userRepository.findAll().then(res => res.map((r): UserDto => ({
            id: r.id,
            email: r.email,
            username: r.username
        })))
    }

    create(userDto: UserCreateDto): Promise<UserDto> {
        return this.userRepository.create({
            username : userDto.username,
            password : userDto.password,
            email : userDto.email
        })
    }

}