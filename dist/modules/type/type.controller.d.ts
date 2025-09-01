import { TypeService } from "./type.service";
import { AddTypeDto, UpdateTypeDto } from "./dto/type.dto";
export declare class TypeController {
    private typeService;
    constructor(typeService: TypeService);
    getAllTypes(): Promise<import("../../entities/Type.entity").TypeEntity[]>;
    addType(body: AddTypeDto): Promise<{
        message: string;
        type: import("../../entities/Type.entity").TypeEntity;
    }>;
    updateType(id: number, body: UpdateTypeDto): Promise<{
        message: string;
        type: import("../../entities/Type.entity").TypeEntity;
    }>;
    deleteType(id: number): Promise<{
        message: string;
    }>;
}
