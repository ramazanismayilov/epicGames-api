import { GeneralService } from "./general.service";
import { MenuCreateDto } from "./dto/addMenu.dto";
export declare class GeneralController {
    private generalService;
    constructor(generalService: GeneralService);
    getRoles(): Promise<import("../../entities/Role.entity").RoleEntity[]>;
    getMenus(): Promise<import("../../entities/Menu.entity").MenuEntity[]>;
    addMenu(body: MenuCreateDto): Promise<{
        message: string;
        data: import("../../entities/Menu.entity").MenuEntity | null;
    }>;
}
