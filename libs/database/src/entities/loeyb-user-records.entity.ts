import { LoeybAreaType } from '@libs/common/constant';
import { LoeybCategoryType } from '@libs/common/constant/loeyb-category-type';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('loeyb_user_records')
export class LOEYBUserRecordsEntity extends BaseEntity {
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
    name: 'user_id',
    type: 'uuid',
    comment: 'userId',
  })
  userId!: string;

  @Column({
    name: 'file_id',
    type: 'varchar',
    length: 255,
    comment: 'fileId',
  })
  fileId!: string;

  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
    comment: 'fileName',
  })
  fileName!: string;

  @Column({
    name: 'area',
    type: 'varchar',
    length: 255,
    comment: 'name',
  })
  area!: LoeybAreaType;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 255,
    comment: 'name',
  })
  category!: LoeybCategoryType;

  @Column({
    name: 'tag',
    type: 'varchar',
    length: 255,
    comment: 'name',
  })
  tag!: string;

  @Column({
    name: 'date',
    type: 'varchar',
    length: 255,
    comment: 'date',
  })
  date!: string;

  @Column({
    name: 'location',
    type: 'varchar',
    length: 255,
    comment: 'location',
  })
  location!: string;

  @Column({
    name: 'importance',
    type: 'bigint',
    nullable: true,
    default: 0,
    comment: '중요도',
  })
  importance!: number;

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
