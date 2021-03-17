import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { USER_ROLE } from "../../user/constants/role.constant";



export class SessionDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsArray()
  @IsEnum(USER_ROLE)
  @ValidateNested({ each: true })
  roles: USER_ROLE[]

  constructor() {}
}