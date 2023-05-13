import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../config/sequelize";

@Table({
  tableName: "users",
  paranoid: true,
})
export class User extends Model {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;

  @Column({
    type: DataTypes.STRING,
  })
  public company_id!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public first_name!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public last_name!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public email!: string;

  @Column({
    type: DataTypes.STRING,
  })
  designation!: string;

  @Column({
    type: DataTypes.DATE,
  })
  dob!: string;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  is_active!: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;

  public deletedAt?: Date;
}

sequelize.addModels([User]);
