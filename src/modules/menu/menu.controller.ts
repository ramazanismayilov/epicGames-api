import { Controller } from "@nestjs/common";
import { MenuService } from "./menu.service";

@Controller('menu')
export class MneuController {
    constructor(private menuService: MenuService) { }
}