import { IsNotEmpty, IsString } from 'class-validator';

export class authPayloadDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
