import { IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "text"})
    name: string;

    @Column({type: "text"})
    lastName: string;

    @Column({type: "text"})
    phoneNumber: string;

    @Column({type: "text"})
    email: string;

    @IsOptional()
    @Column({
        type: "text",
        nullable: true
    })
    photoUrl: string;
}
