import { Controller, Get } from "@nestjs/common";
import { GlobalService } from "./global.service";

@Controller('global')
export class GlobalController {
    constructor(private globalService: GlobalService) { }

    @Get('countries')
    allCountries(){
        return this.globalService.allCountries()
    }
}
