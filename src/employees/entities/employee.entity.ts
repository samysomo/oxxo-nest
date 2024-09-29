import { IsOptional } from "class-validator";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name : "locationId"
    })
    location: Location
}
