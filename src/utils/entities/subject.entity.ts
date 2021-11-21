import {  AllowNull, Column, Table } from 'sequelize-typescript';
import BaseModel from './base.entity';

@Table({tableName: 'subjects'})
export class Subject extends BaseModel {
  
  @AllowNull(false)
  @Column
  subjectName: string

  @AllowNull(false)
  @Column
  grade: number

}
