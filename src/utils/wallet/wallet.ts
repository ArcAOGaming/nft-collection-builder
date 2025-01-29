import { JWKInterface } from "arweave/node/lib/wallet";
import { BrowserWallet, Wallet } from "./types";
import { Environment, EnvironmentVariableError, getEnvironment, getEnvironmentVariable, UnknownEnvironmentError } from "../environment/index"
import { BrowserWalletError, FileReadError } from "./WalletError";
import { Logger } from "../logger/logger";
import Arweave from "arweave";

let cachedWallet: Wallet | undefined;

export function getWallet(): Wallet | undefined {
    if (cachedWallet) {
        return cachedWallet;
    }

    const environment = getEnvironment();

    switch (environment) {
        case Environment.NODE: {
            let pathToWallet = "MissingWalletPath";
            try {
                pathToWallet = getEnvironmentVariable('PATH_TO_WALLET'); // May throw EnvironmentVariableError

                let fs;
                try {
                    fs = eval('require("fs")');
                } catch {
                    throw new FileReadError(pathToWallet, 'fs module not available');
                }

                const walletData = fs.readFileSync(pathToWallet, 'utf-8'); // May throw FS errors
                cachedWallet = JSON.parse(walletData); // May throw SyntaxError if JSON is malformed
                return cachedWallet;
            } catch (error: unknown) {
                if (error instanceof EnvironmentVariableError) {
                    Logger.warn(`Warning: Missing environment variable: ${error.message}`)
                    return undefined;
                } else if (error instanceof Error) {
                    throw new FileReadError(pathToWallet, error.message);
                } else {
                    throw new FileReadError(pathToWallet, 'Unknown error');
                }
            }
        }
        case Environment.BROWSER: {
            if ('arweaveWallet' in globalThis) {
                cachedWallet = (globalThis as any).arweaveWallet as BrowserWallet;
                return cachedWallet;
            }
            throw new BrowserWalletError();
        }
    }
}

export async function getCallingWalletAddress(): Promise<string> {
    const wallet = getWallet();
    if (!wallet) {
        throw new Error('Wallet not initialized');
    }

    const environment = getEnvironment();
    switch (environment) {
        case Environment.BROWSER:
            return await (wallet as BrowserWallet).getActiveAddress();
        case Environment.NODE:
            const arweave = Arweave.init({});
            return await arweave.wallets.jwkToAddress(wallet);
        default:
            throw new UnknownEnvironmentError();
    }
}
