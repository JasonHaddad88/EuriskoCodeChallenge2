import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateComplaintDto {
    @IsString()
    title: string;

    @IsString()
    complaintBody: string;
}