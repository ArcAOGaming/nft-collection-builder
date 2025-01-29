import { NFTCollectionBuilder, Collection } from '../../src/core';

describe('NFTCollectionBuilder Integration', () => {
    it('should create a collection with multiple assets', async () => {
        // Arrange
        const collection: Collection = {
            title: "Test Collection",
            description: "A collection of test assets for integration tests",
            creator: "Z11o-F2kTQ6FBMp2eLdsYLvfhHJUG6_FLOASM_Ek9eQ",
            banner: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", // 1x1 transparent PNG
            thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", // 1x1 transparent PNG
            skipRegistry: undefined
        };

        const assets = [
            {
                name: "Test Asset 1",
                description: "First test asset for integration tests",
                title: "Test Asset 1",
                topics: ["test", "integration", "asset1"],
                data: "Test Asset 1 Data",
                contentType: "text/plain",
                type: "Test Atomic Asset",
                creator: collection.creator
            },
            {
                name: "Test Asset 2",
                title: "Test Asset 2",
                description: "Second test asset for integration tests",
                topics: ["test", "integration", "asset2"],
                data: "Test Asset 2 Data",
                contentType: "text/plain",
                type: "Test Atomic Asset",
                creator: collection.creator
            }
        ];

        // Act
        const builder = new NFTCollectionBuilder()
            .setCollectionDetails(collection)
            .addAtomicAssets(assets);

        const collectionId = await builder.build();

        // Assert
        expect(collectionId).toBeDefined();
        expect(typeof collectionId).toBe('string');
        expect(collectionId.length).toBeGreaterThan(0);
    }, 60000);
});
