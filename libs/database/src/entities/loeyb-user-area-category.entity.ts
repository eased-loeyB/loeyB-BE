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

@Entity('loeyb_user_area_category')
export class LOEYBUserAreaCategoryEntity extends BaseEntity {
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
    name: 'area',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'area',
  })
  area?: LoeybAreaType | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'category',
  })
  category?: LoeybCategoryType | null;

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
