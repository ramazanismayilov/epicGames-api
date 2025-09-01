import { DataSource } from 'typeorm';
export declare class AppService {
    private dataSource;
    private roleRepo;
    constructor(dataSource: DataSource);
    onApplicationBootstrap(): void;
    seedRoles(): Promise<void>;
}
