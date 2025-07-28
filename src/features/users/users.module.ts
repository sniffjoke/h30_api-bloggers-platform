import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './api/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidModule } from 'nestjs-uuid';
import { CryptoModule } from '../../core/modules/crypto/crypto.module';
import { UsersCommandHandlers } from './application/useCases';
import { UserEntity } from './domain/user.entity';
import { EmailConfirmationEntity } from './domain/email-confirmation.entity';
import { UsersRepositoryTO } from './infrastructure/users.repository.to';
import { UsersQueryRepositoryTO } from './infrastructure/users.query-repositories.to';
import { TokensModule } from '../tokens/tokens.module';
import { UserScoreEntity } from '../quiz/domain/user-score.entity';
import { BanInfoEntity } from './domain/ban-info.entity';
import { CommentsRepositoryTO } from '../comments/infrastructure/comments.repository.to';
import { CommentEntity } from '../comments/domain/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EmailConfirmationEntity, UserScoreEntity, BanInfoEntity, CommentEntity]),
    CryptoModule,
    UuidModule,
    TokensModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepositoryTO,
    UsersQueryRepositoryTO,
    CommentsRepositoryTO,
    ...UsersCommandHandlers,
  ],
  exports: [
    CryptoModule,
    UuidModule,
    UsersService,
    UsersRepositoryTO,
    UsersQueryRepositoryTO,
    CommentsRepositoryTO,
    ...UsersCommandHandlers,
  ],
})
export class UsersModule {
}
