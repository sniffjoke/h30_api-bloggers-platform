import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepositoryTO } from '../../infrastructure/users.repository.to';
import { BanUserDto } from '../../api/models/input/ban-user.dto';

export class BanUserCommand {
  constructor(
    public userId: string,
    public banUserModel: BanUserDto
  ) {
  }

}

@CommandHandler(BanUserCommand)
export class BanUserUseCase
  implements ICommandHandler<BanUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepositoryTO
  ) {

  }

  async execute(command: BanUserCommand) {
    const findedUser = await this.usersRepository.findUserById(command.userId);
    const banDate = command.banUserModel.isBanned ? new Date(Date.now()).toISOString() : null
    findedUser.banUser(findedUser, command.banUserModel, banDate);
    return await this.usersRepository.saveUser(findedUser);
  }
}
