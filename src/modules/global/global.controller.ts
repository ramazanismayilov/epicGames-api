import { Controller, Get } from "@nestjs/common";
import { GlobalService } from "./global.service";

@Controller('country')
export class GlobalController {
    constructor(private globalService: GlobalService) { }

    @Get()
    allCountries(){
        return this.globalService.allCountries()
    }
}
