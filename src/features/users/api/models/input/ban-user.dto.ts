// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.models';
//
// export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class BanUserDto {
    isBanned: boolean;
  banReason: string | null;
}

export class BanInfoDto extends BanUserDto {
  banDate: string | null;
}
