import { initializePermaweb } from "../utils/permaweb";
import { Logger } from "../utils/logger/logger";
import { NFTCollectionError, CollectionValidationError, AssetValidationError, AssetTopicsError } from "./NFTCollectionError";
import { AtomicAsset, Collection } from "./types";
import { AssetCreateArgsType } from "@permaweb/libs"

export class NFTCollectionBuilder {
    private collection: Collection;
    private assets: AtomicAsset[] = [];
    private assetIds: string[] = [];
    private permaweb = initializePermaweb();

    constructor() {
        this.collection = {
            title: '',
            description: '',
            creator: '',
            thumbnail: '',
            banner: '',
            skipRegistry: undefined
        };
    }

    public setCollectionDetails(collection: Collection): NFTCollectionBuilder {
        this.collection = collection;
        return this;
    }

    public addAtomicAsset(asset: AtomicAsset): NFTCollectionBuilder {
        this.validateAtomicAsset(asset);
        this.assets.push(asset);
        return this;
    }

    public addAtomicAssets(assets: AtomicAsset[]): NFTCollectionBuilder {
        assets.forEach(asset => this.addAtomicAsset(asset));
        return this;
    }

    private validateCollection(): Collection {
        if (!this.collection.title) throw new CollectionValidationError('title');
        if (!this.collection.description) throw new CollectionValidationError('description');
        if (!this.collection.creator) throw new CollectionValidationError('creator');
        if (!this.collection.thumbnail) throw new CollectionValidationError('thumbnail');
        if (!this.collection.banner) throw new CollectionValidationError('banner');

        return this.collection;
    }

    private validateAtomicAsset(asset: AtomicAsset): void {
        if (!asset.name) throw new AssetValidationError('name');
        if (!asset.description) throw new AssetValidationError('description');
        if (!Array.isArray(asset.topics)) throw new AssetTopicsError();
        if (!asset.data) throw new AssetValidationError('data');
        if (!asset.contentType) throw new AssetValidationError('content type');
        if (!asset.type) throw new AssetValidationError('type');
    }

    private async createSingleAtomicAsset(asset: AtomicAsset): Promise<string> {
        Logger.info(`Creating atomic asset: ${asset.name}`);
        const assetId = await this.permaweb.createAtomicAsset({
            ...asset,
            creator: this.collection.creator,
            title: asset.name // Required by the API
        });
        Logger.info(`Created atomic asset with ID: ${assetId} `);
        return assetId;
    }

    private async createAtomicAssets(): Promise<void> {
        Logger.info('Creating atomic assets...');
        for (const asset of this.assets) {
            const assetId = await this.createSingleAtomicAsset(asset);
            this.assetIds.push(assetId);
        }
    }

    private async createCollection(): Promise<string> {
        Logger.info('Creating collection...');
        const collection = this.validateCollection();
        const collectionId = await this.permaweb.createCollection(collection);
        Logger.info(`Created collection with ID: ${collectionId} `);
        return collectionId;
    }

    private async linkAssetsToCollection(collectionId: string): Promise<void> {
        Logger.info('Adding assets to collection...');
        await this.permaweb.updateCollectionAssets({
            collectionId,
            assetIds: this.assetIds,
            creator: this.collection.creator,
            updateType: 'Add'
        });
        Logger.info('Successfully added assets to collection');
    }

    public async build(): Promise<string> {
        try {
            if (this.assets.length === 0) {
                throw new NFTCollectionError('At least one atomic asset is required to build a collection');
            }

            await this.createAtomicAssets();
            const collectionId = await this.createCollection();
            await this.linkAssetsToCollection(collectionId);

            return collectionId;
        } catch (error) {
            Logger.error('Failed to build NFT collection');
            throw error;
        }
    }
}
