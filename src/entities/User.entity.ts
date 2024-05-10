import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity("User")
export class User {
    @PrimaryGeneratedColumn('uuid', {
        name: 'Id',
    })
    id: string;

    @Column('nvarchar', {
        length: 255,
        nullable: false,
    })
    email: string;

    @Column('nvarchar', {
        length: 255,
        nullable: false,
    })
    password: string;

    @CreateDateColumn({
        type: 'datetime',
    })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'datetime',
        nullable: true,
    })
    deletedAt?: Date;
}
