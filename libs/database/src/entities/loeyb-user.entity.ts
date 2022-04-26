import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('loeyb-user')
export class LOEYBUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: '고유 아이디',
  })
  id!: string;

  @Column({
    name: 'seq',
    type: 'int8',
    unique: true,
    comment: 'indexing',
  })
  @Generated('increment')
  seq!: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 320,
    unique: true,
    comment: '로그인 이메일',
  })
  email!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    comment: '패스워드',
  })
  password!: string;

  @Column({
    name: 'username',
    type: 'varchar',
    default: '',
    length: 320,
    unique: true,
    comment: 'username',
  })
  username!: string;

  @Column({
    name: 'last_login_at',
    type: 'timestamptz',
    nullable: true,
    comment: '마지막 로그인 시간',
  })
  lastLoginAt?: Date | null;

  @Column({
    name: 'last_logout_at',
    type: 'timestamptz',
    nullable: true,
    comment: '마지막 로그아웃 시간',
  })
  lastLogoutAt?: Date | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    comment: '생성일',
    update: false,
  })
  createdAt!: Date;
  /**
   * updatedAt
   */
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    comment: '수정일',
  })
  updatedAt!: Date;
}
