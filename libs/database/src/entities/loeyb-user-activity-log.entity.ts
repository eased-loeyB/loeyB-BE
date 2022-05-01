import { LOEYBUserActivityType } from '@libs/common/constant';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('capa_user_activity_log')
export class LOEYBUserActivityLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'generatoed log id',
  })
  id!: string;

  @Column({
    name: 'seq',
    type: 'bigint',
    unique: true,
    comment: '순차 인덱스',
    update: false,
  })
  @Generated('increment')
  seq!: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 320,
    nullable: true,
    comment: '이메일 (로그인 아이디)',
    update: false,
  })
  email?: string | null;

  @Column({
    name: 'activity_type',
    type: 'varchar',
    nullable: true,
    default: LOEYBUserActivityType.PAGE_VISIT,
    comment: '유저 액티비티 타입',
    update: false,
  })
  activityType?: LOEYBUserActivityType | null;

  @Column({
    name: 'activity_id',
    type: 'varchar',
    nullable: true,
    comment: '액티비티 아이디',
    update: false,
  })
  activitiId?: string | null;

  @Column({
    name: 'ip',
    type: 'varchar',
    nullable: true,
    comment: 'ip',
    update: false,
  })
  ip?: string | null;

  @Column({
    name: 'os',
    type: 'varchar',
    nullable: true,
    comment: 'os',
    update: false,
  })
  os?: string | null;

  @Column({
    name: 'device_type',
    type: 'varchar',
    nullable: true,
    comment: '디바이스 타입',
    update: false,
  })
  deviceType?: string | null;

  @Column({
    name: 'browser',
    type: 'varchar',
    nullable: true,
    comment: '브라우저 정보',
    update: false,
  })
  browser?: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    comment: '생성일',
    update: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    comment: '수정일',
  })
  updatedAt!: Date;
}
