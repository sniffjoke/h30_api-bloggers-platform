import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepositoryTO } from '../../infrastructure/users.repository.to';
import { BanUserDto } from '../../api/models/input/ban-user.dto';
import { CommentsRepositoryTO } from '../../../comments/infrastructure/comments.repository.to';

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
    private readonly usersRepository: UsersRepositoryTO,
    private readonly commentsRepository: CommentsRepositoryTO
  ) {

  }

  async execute(command: BanUserCommand) {
    const findedUser = await this.usersRepository.findUserById(command.userId);
    console.log(findedUser.comments);
    const banDate = command.banUserModel.isBanned ? new Date(Date.now()).toISOString() : null
    const banReason = command.banUserModel.isBanned ? command.banUserModel.banReason : null
    const banUserData = {
      isBanned: command.banUserModel.isBanned,
      banDate,
      banReason,
    }
    findedUser.banUser(findedUser, banUserData);
    await Promise.all(findedUser.comments.map(item => this.commentsRepository.deleteComment(item.id)));
    return await this.usersRepository.saveUser(findedUser);
  }
}
