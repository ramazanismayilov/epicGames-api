import { HttpService } from '@nestjs/axios';
export declare class GlobalService {
    private httpService;
    constructor(httpService: HttpService);
    allCountries(): Promise<any>;
}
