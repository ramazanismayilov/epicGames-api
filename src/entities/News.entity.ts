import { Column, CreateDateColumn, Entity, getRepository, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MediaEntity } from "./Media.entity";

@Entity('news')
export class NewsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => MediaEntity, { onDelete: 'SET NULL' })
    @JoinColumn({
        name: 'mediaId',
        referencedColumnName: 'id',
    })
    media: MediaEntity;

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'int' })
    order: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}