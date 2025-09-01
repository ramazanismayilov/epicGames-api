import { GlobalService } from "./global.service";
export declare class GlobalController {
    private globalService;
    constructor(globalService: GlobalService);
    allCountries(): Promise<any>;
}
