import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Credential } from "./Credentials";
import { Appointment } from "./Appointments";

@Entity({ //tabla users
    name: "users"
}) 
export class User {
    @PrimaryGeneratedColumn ()
    id: number          // ID numérico

    @Column({
        length: 100
    })
    name: string        //VARCHAR (100)

    @Column({
        unique: true,
        length: 150
    })
    email: string;

    @Column({ type: "date" })
    birthdate: Date;

    @Column()
    nDni: number        // número de DNI

    //  Relación 1:1 con Credential
    @OneToOne(() => Credential, credential => credential.user, { cascade: true })
    @JoinColumn() 
    credential: Credential

    //  Relación 1:N con Appointment
    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];

    @Column({ default: true })
    active: boolean;
}
