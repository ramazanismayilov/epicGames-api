import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GlobalService {
    constructor(
        private httpService: HttpService,
    ) { }

    async allCountries() {
        const response$ = this.httpService.get('https://countriesnow.space/api/v0.1/countries');
        const response = await lastValueFrom(response$);

        const countries = response.data.data.map((item: any, i: number) => ({ id: i + 1, name: item.country }));
        return countries;
    }
}