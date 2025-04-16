import { Module } from "@nestjs/common";
import { MneuController } from "./menu.controller";
import { MenuService } from "./menu.service";

@Module({
    imports: [],
    controllers: [MneuController],
    providers: [MenuService]
})
export class MenuModule { }