import {  AllowNull, Column, DataType, Table } from 'sequelize-typescript';
import BaseModel, { Roles } from './base.entity';

@Table({tableName: 'users'})
export class User extends BaseModel {
  
  @AllowNull(false)
  @Column
  username: string

  @AllowNull(false)
  @Column
  hash: string

  @AllowNull(true)
  @Column
  grade: number

  @AllowNull(true)
  @Column(DataType.TEXT)
  tokenSession: string

  @AllowNull(false)
  @Column
  role: Roles

}
