import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('banInfo')
export class BanInfoEntity {

  @PrimaryColumn()
  userId: string


  @Column({default: false})
  isBanned: boolean;

  @Column({nullable: true})
  banDate: string

  @Column({nullable: true})
  banReason: string

  @OneToOne(() => UserEntity, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user: UserEntity;

}
