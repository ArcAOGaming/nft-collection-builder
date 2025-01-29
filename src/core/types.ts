import { AssetCreateArgsType } from "@permaweb/libs";

export type AtomicAsset = AssetCreateArgsType;

export interface Collection {
    title: string;
    description: string;
    creator: string;
    thumbnail: string;
    banner: string;
    skipRegistry?: boolean;
}
