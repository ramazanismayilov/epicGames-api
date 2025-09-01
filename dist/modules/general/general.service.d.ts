import { RoleEntity } from "../../entities/Role.entity";
import { DataSource } from "typeorm";
import { MenuEntity } from "../../entities/Menu.entity";
import { MenuCreateDto } from "./dto/addMenu.dto";
import { ClsService } from "nestjs-cls";
export declare class GeneralService {
    private cls;
    private dataSource;
    private roleRepo;
    private menuRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getRoles(): Promise<RoleEntity[]>;
    getMenus(): Promise<MenuEntity[]>;
    addMenu(params: MenuCreateDto): Promise<{
        message: string;
        data: MenuEntity | null;
    }>;
}
