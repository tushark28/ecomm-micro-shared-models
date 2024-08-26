import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { IsEmail, Length, IsOptional, IsEnum } from 'class-validator';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MODERATOR = 'moderator',
}

@Entity('users')
@Index(['email'], { unique: true })
@Index(['username'], { unique: true })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    @Length(4, 100)
    username: string;

    @Column({ length: 255 })
    @IsEmail()
    email: string;

    @Column({ length: 255 })
    @Length(8, 255)
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    @IsEnum(UserRole)
    role: UserRole;

    @Column({ nullable: true })
    @IsOptional()
    @Length(2, 100)
    firstName?: string;

    @Column({ nullable: true })
    @IsOptional()
    @Length(2, 100)
    lastName?: string;

    @Column({ nullable: true, length: 20 })
    @IsOptional()
    phoneNumber?: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @Column({ default: true })
    isActive: Boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}
