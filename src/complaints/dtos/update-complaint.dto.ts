import {IsString, IsEnum} from "class-validator";
import { Status } from "src/enums/status.enum";


export class UpdateComplaintDto{
    @IsEnum(Status)
    status: Status;
}