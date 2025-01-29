export class NFTCollectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NFTCollectionError';
    }
}

export class CollectionValidationError extends NFTCollectionError {
    constructor(field: string) {
        super(`Collection ${field} is required`);
        this.name = 'CollectionValidationError';
    }
}

export class AssetValidationError extends NFTCollectionError {
    constructor(field: string) {
        super(`Asset ${field} is required`);
        this.name = 'AssetValidationError';
    }
}

export class AssetTopicsError extends NFTCollectionError {
    constructor() {
        super('Asset topics must be an array');
        this.name = 'AssetTopicsError';
    }
}
