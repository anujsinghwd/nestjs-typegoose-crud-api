import {Injectable} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';
import { User } from "./users.model";
import { CreateUserDto, DeleteUserDto, LoginUserDto } from "./dto";
import * as pickby from "lodash.pickby";


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
            return this.returnResponse({}, false, 'User Already Exists');
        }
        else {
            const createdUser = new this.userModel(createUserDto);
            const user = await createdUser.save();
            return this.returnResponse(user, true, 'User Created successfully');
        }
    }

    async listUsers(): Promise<User | any> {
        const user = await this.userModel.find({}, this.projection).exec();
        if(!user.length) {
            return this.returnResponse({}, false, 'User Data not found');
        }
        return this.returnResponse(user, true, 'User Data found');
    }

    async delete(deleteUserDto: DeleteUserDto): Promise<any> {
        const {id} = deleteUserDto;
        let delResponse;
        try {
            delResponse = await this.userModel.deleteOne({_id: id['id']}).exec();
            if(delResponse.deletedCount) {
                delResponse = 'User deleted Successfully'
            } else {
                delResponse = 'User Not Found';
            }
            const success = (delResponse === 'User deleted Successfully') ? true : false;
            return this.returnResponse({}, success, delResponse);
        } catch(err) {
            if(err.name === 'CastError') {
                delResponse = 'User Id Not Found';
            }
            return this.returnResponse({}, false, delResponse);
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const {email, password} = loginUserDto;
        const user = await this.userModel.findOne({email: email}).exec();
        if(!user){
            return this.returnResponse({}, false, 'Email Not Found');
        }   
        if(user.password !== password) {
            return this.returnResponse({}, false, 'Incorrect Password');
        }
        return this.returnResponse(pickby(user, (val, key) => (key === 'email' || key === 'name' || key === 'isActive')), true, 'User Login Success');
    }

    async returnResponse(data: object, success: boolean, message: string): Promise<any> {
        return {success, message, data};
    }
}