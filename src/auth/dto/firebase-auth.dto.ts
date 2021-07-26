import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FirebaseAuthDTO {
    @ApiProperty()
    @IsString()
    accessToken: string
}