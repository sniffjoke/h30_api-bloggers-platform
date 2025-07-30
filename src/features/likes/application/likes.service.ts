import { Injectable } from '@nestjs/common';
import { PostsRepositoryTO } from '../../posts/infrastructure/posts.repository.to';
import { LikesRepository } from '../infrastructure/likes.repository';

@Injectable()
export class LikesService {
  constructor(
    private readonly postsRepository: PostsRepositoryTO,
    private readonly likesRepository: LikesRepository,
  ) {}

  async reCalculateLikesInfoForUserWithPosts(userId: string) {
    const posts = await this.postsRepository.getAllPosts();
    const likes = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await this.likesRepository.getLikesByPostId(
          post.id,
          userId,
        );
        post.extendedLikesInfo.likesCount = likesCount
        await this.postsRepository.savePost(post)
        return likesCount;
      }),
    );
    const dislikes = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await this.likesRepository.getLikesByPostId(
          post.id,
          userId,
        );
        post.extendedLikesInfo.dislikesCount = likesCount
        await this.postsRepository.savePost(post)
        return likesCount;
      }),
    );
    return console.log('likesCount: ', likes, dislikes);
    // const likesCount = await this
  }
}
