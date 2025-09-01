import { ClsService } from "nestjs-cls";
import { DataSource } from "typeorm";
import { TypeEntity } from "../../entities/Type.entity";
import { AddTypeDto, UpdateTypeDto } from "./dto/type.dto";
export declare class TypeService {
    private cls;
    private dataSource;
    private typeRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    getAllTypes(): Promise<TypeEntity[]>;
    addType(params: AddTypeDto): Promise<{
        message: string;
        type: TypeEntity;
    }>;
    updateType(typeId: number, params: UpdateTypeDto): Promise<{
        message: string;
        type: TypeEntity;
    }>;
    deleteType(typeId: number): Promise<{
        message: string;
    }>;
}
