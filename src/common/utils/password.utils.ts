import { BadRequestException } from "@nestjs/common";

export function validatePasswords(newPassword: string, repeatPassword: string) {
    if (newPassword !== repeatPassword) {
        throw new BadRequestException('Passwords do not match');
    }
}