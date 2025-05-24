import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FirebaseModule } from "../../libs/firebase/firebase.module";

@Module({
    imports: [FirebaseModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }