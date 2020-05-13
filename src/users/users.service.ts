import {Injectable} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';
import { User } from "./users.model";
import { CreateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
    }
    projection = {
        password: 0, 
        timestamp: 0,
    }
    async create(createUserDto: CreateUserDto): Promise<User | any> {
        const user = await this.userModel.findOne({email: createUserDto.email}, this.projection).exec();
        if(user) {
            return {exists:'User Already Exists'};
        }
        else {
            const createdUser = new this.userModel(createUserDto);
            return await createdUser.save();
        }
    }

    async listUsers(): Promise<User[] | null> {
        return await this.userModel.find({}, this.projection).exec();
    }

    async delete(deleteUserDto: {id: string}): Promise<any> {
        const {id} = deleteUserDto;
        console.log(id);
        let delResponse;
        try {
            delResponse = await this.userModel.find({_id: id['id']}).remove().exec();
            delResponse = (delResponse.deletedCount) ? {success: true} : {NotExist: 'Id not Exists'};
        } catch(err) {
            if(err.name === 'CastError') {
                delResponse = {NotFound: 'User Id Not Found'};
            }
        }
        return delResponse;
    }
}