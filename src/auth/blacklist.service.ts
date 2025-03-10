import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const BLACKLIST_FILE = path.join(__dirname, 'jwt_blacklist.txt');

@Injectable()
export class BlacklistService {
    // Add a JWT token to the blacklist file
    addToBlacklist(token: string): void {
        fs.appendFileSync(BLACKLIST_FILE, token + '\n');
    }


    // Check if a token is blacklisted
    isTokenBlacklisted(token: string): boolean {
        if (!fs.existsSync(BLACKLIST_FILE)) {
            return false;
        }
        const blacklistedTokens = fs.readFileSync(BLACKLIST_FILE, 'utf-8').split('\n');
        return blacklistedTokens.includes(token);
    }
}
