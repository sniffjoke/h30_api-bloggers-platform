import { Injectable} from '@nestjs/common';
import { TokensService } from '../../tokens/application/tokens.service';
import { UsersRepositoryTO } from '../../users/infrastructure/users.repository.to';
import { CommentsRepositoryTO } from '../../comments/infrastructure/comments.repository.to';

@Injectable()
export class LikesService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersRepository: UsersRepositoryTO,
    private readonly commentsRepository: CommentsRepositoryTO,
  ) {
  }

  async reCalculateLikesInfoForComments(bearerHeader: string, commentId: string) {
    // const token = this.tokensService.getToken(bearerHeader);
    // const decodedToken: any = this.tokensService.validateAccessToken(token);
    // const user = await this.usersRepository.findUserById(decodedToken?._id);
    // const findedComment = await this.commentsRepository.findCommentById(commentId);
    // return {
    //   findedComment,
    //   user,
    // };
    
  }



}
