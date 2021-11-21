import {
  AllowNull,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import BaseModel from './base.entity';
import { Chapter } from './chapter.entity';
import { Subject } from './subject.entity';
import { User } from './user.entity';

@Table({ tableName: 'reports' })
export class Report extends BaseModel {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  // column berikut redundant, sudah ada di user table (student table)
  @AllowNull(false)
  @Column
  grade: number;
  //

  // column berikut redundant, bisa dipanggil lewat chapter
  @AllowNull(false)
  @ForeignKey(() => Subject)
  @Column
  subjectId: string;

  @BelongsTo(() => Subject)
  subject: Subject;
  //

  @AllowNull(false)
  @ForeignKey(() => Chapter)
  @Column
  chapterId: string;

  @BelongsTo(() => Chapter)
  chapter: Chapter;

  @AllowNull(true)
  @Column(DataType.DECIMAL(5,2))
  score: number;
}
