import Arweave from "arweave";
import { connect, createDataItemSigner } from "@permaweb/aoconnect";
import Permaweb from "@permaweb/libs";
import { getWallet } from "../wallet";
import { Logger } from "../logger/logger";

import { PermawebError } from './PermawebError';

export function initializePermaweb() {
    try {
        const wallet = getWallet();
        if (!wallet) {
            throw new PermawebError('Wallet not initialized');
        }

        const arweave = Arweave.init({
            host: "arweave.net",
            port: 443,
            protocol: "https"
        });

        return Permaweb.init({
            ao: connect(),
            arweave,
            signer: createDataItemSigner(wallet),
        });
    } catch (error) {
        Logger.error('Failed to initialize Permaweb');
        throw new PermawebError(error instanceof Error ? error.message : 'Unknown error initializing Permaweb');
    }
}
