import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

import { DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../config/sequelize";

@Table({
  tableName: "company",
  paranoid: true,
})
export class Company extends Model {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;

  @Column({
    type: DataTypes.STRING,
  })
  public name!: string;

  @Column({
    type: DataTypes.STRING,
  })
  public address!: string;

  @Column({
    type: DataTypes.FLOAT,
  })
  public lat!: number;

  @Column({
    type: DataTypes.FLOAT,
  })
  public long!: number;

  public createdAt?: Date;

  public updatedAt?: Date;

  public deletedAt?: Date;
}

sequelize.addModels([Company]);
