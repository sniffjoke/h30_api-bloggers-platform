import {Injectable, NotFoundException} from '@nestjs/common';
import {BlogCreateModel} from '../api/models/input/create-blog.input.model';
import {InjectDataSource, InjectRepository} from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {BlogEntity} from '../domain/blogs.entity';
import {UserEntity} from "../../users/domain/user.entity";


@Injectable()
export class BlogsRepositoryTO {
    constructor(
        @InjectRepository(BlogEntity) private readonly bRepository: Repository<BlogEntity>,
        @InjectDataSource() public readonly dataSource: DataSource,
    ) {
    }

    async createBlog(blogData: BlogCreateModel, user?: UserEntity) {
        const blog = new BlogEntity();
        blog.name = blogData.name;
        blog.description = blogData.description;
        blog.websiteUrl = blogData.websiteUrl;
        if (user) {
            blog.user = user;
        }
        const newBlog = await this.bRepository.save(blog);
        return newBlog.id;
    }

    async findBlogById(id: string) {
        const findedBlog = await this.bRepository.findOne({
            where: {id},
        });
        if (!findedBlog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }
        return findedBlog;
    }

    async updateBlogById(id: string, dto: BlogCreateModel) {
        const findedBlog = await this.findBlogById(id)
        if (findedBlog) {
            findedBlog.name = dto.name;
            findedBlog.description = dto.description;
            findedBlog.websiteUrl = dto.websiteUrl;
            await this.bRepository.manager.save(findedBlog)
        }
        return findedBlog;
    }

    async bindUserAsOwnToBlog(blog: BlogEntity, user: UserEntity) {
        blog.user = user;
        return await this.bRepository.manager.save(blog)
    }

    async deleteBlog(id: string) {
        const findedBlog = await this.findBlogById(id);
        return await this.bRepository.delete(
            {id},
        );
    }
}
