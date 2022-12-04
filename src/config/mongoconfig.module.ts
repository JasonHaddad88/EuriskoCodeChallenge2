import { Global, Module } from '@nestjs/common';

import { MongoConfigService } from './mongoconfig.service';

@Global()
@Module({
    providers: [
        {
            provide: MongoConfigService,
            useValue: new MongoConfigService(),
        },
    ],
    exports: [MongoConfigService],
})
export class MongoConfigModule { }