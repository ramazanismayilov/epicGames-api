import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { RoleEntity } from "../../entities/Role.entity";
import { DataSource, In, Repository } from "typeorm";
import { MenuEntity } from "../../entities/Menu.entity";
import { MenuCreateDto } from "./dto/addMenu.dto";
import { ClsService } from "nestjs-cls";
import { UserEntity } from "../../entities/User.entity";
import { Role } from "../../common/enums/role.enum";

@Injectable()
export class GeneralService {
    private roleRepo: Repository<RoleEntity>
    private menuRepo: Repository<MenuEntity>

    constructor(
        private cls: ClsService,
        @InjectDataSource() private dataSource: DataSource
    ) {
        this.roleRepo = this.dataSource.getRepository(RoleEntity)
        this.menuRepo = this.dataSource.getRepository(MenuEntity)
    }

    async getRoles() {
        const currentUser = this.cls.get<UserEntity>('user');
        if (currentUser.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission for this operation');
        let roles = await this.roleRepo.find();
        if (!roles.length) throw new NotFoundException('Role not found')
        return roles
    }

    async getMenus() {
        const user = this.cls.get<UserEntity>('user');
        const roleId = user.role.id;

        const menus = await this.menuRepo.find({
            where: {
                roles: {
                    id: roleId,
                },
            },
        });

        if (!menus.length) throw new NotFoundException('Menu not found');
        return menus;
    }

    async addMenu(params: MenuCreateDto) {
        const currentUser = this.cls.get<UserEntity>('user');
        if (currentUser.role.name !== Role.ADMIN) throw new ForbiddenException('You do not have permission for this operation');

        const roles = params.roles.map(id => ({ id }));
        const foundRoles = await this.roleRepo.findBy({ id: In(params.roles) });
        if (foundRoles.length !== params.roles.length) throw new NotFoundException('One or more roles not found');

        let menu = this.menuRepo.create({ ...params, roles });
        const savedMenu = await this.menuRepo.save(menu);

        const menuWithRelations = await this.menuRepo.findOne({ where: { id: savedMenu.id }, relations: ['roles'] });
        return { message: 'Menu created successfully', data: menuWithRelations };
    }
}