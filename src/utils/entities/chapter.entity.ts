import {  AllowNull, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import BaseModel, { Roles } from './base.entity';
import { Subject } from './subject.entity';

@Table({tableName: 'chapters'})
export class Chapter extends BaseModel {
  
  @AllowNull(false)
  @Column
  chapterName: string

  // grade di sini permintaan soal, seharusnya tidak perlu, karna sudah ada di subjects table
  @AllowNull(false)
  @Column
  grade: number

  @AllowNull(false)
  @ForeignKey(() => Subject)
  @Column
  subjectId: string;

  @BelongsTo(() => Subject)
  subject: Subject;

}
