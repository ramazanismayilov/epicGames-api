import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GlobalService {
    constructor(
        private httpService: HttpService,
    ) { }

    async allCountries() {
        const response$ = this.httpService.get('https://restcountries.com/v3.1/all');
        const response = await lastValueFrom(response$);

        const countries = response.data.map((item: any, i: number) => ({ id: i + 1, name: item.name.common, flag: item.flags.png }));
        return countries;
    }
}