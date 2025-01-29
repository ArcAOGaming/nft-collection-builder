import { JWKInterface } from "arweave/node/lib/wallet";

export interface BrowserWallet extends JWKInterface {
    getActiveAddress(): Promise<string>;
}

export type Wallet = JWKInterface | BrowserWallet;
