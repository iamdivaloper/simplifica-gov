/**
 * Cache Layer using IndexedDB
 * Provides persistent caching with TTL support for SimplificaGov
 */

const DB_NAME = "simplificagov_cache";
const DB_VERSION = 1;

export type CacheStore = "leis" | "parlamentares" | "traducoes" | "estatisticas";

interface CacheEntry<T = any> {
    key: string;
    value: T;
    timestamp: number;
    ttl?: number; // Time to live in milliseconds
}

interface CacheStats {
    totalEntries: number;
    storeStats: Record<CacheStore, number>;
    dbSize?: number;
}

class CacheManager {
    private db: IDBDatabase | null = null;
    private initPromise: Promise<void> | null = null;

    /**
     * Initialize IndexedDB
     */
    private async init(): Promise<void> {
        if (this.db) return;
        if (this.initPromise) return this.initPromise;

        this.initPromise = new Promise((resolve, reject) => {
            if (typeof window === 'undefined' || !window.indexedDB) {
                console.warn("[Cache] IndexedDB not available");
                reject(new Error("IndexedDB not available"));
                return;
            }

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error("[Cache] Failed to open IndexedDB:", request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log("[Cache] IndexedDB initialized successfully");
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create object stores for different data types
                const stores: CacheStore[] = ["leis", "parlamentares", "traducoes", "estatisticas"];

                stores.forEach(storeName => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: "key" });
                        console.log(`[Cache] Created store: ${storeName}`);
                    }
                });
            };
        });

        return this.initPromise;
    }

    /**
     * Get item from cache
     */
    async get<T>(store: CacheStore, key: string): Promise<T | null> {
        try {
            await this.init();
            if (!this.db) return null;

            return new Promise((resolve, reject) => {
                const transaction = this.db!.transaction(store, "readonly");
                const objectStore = transaction.objectStore(store);
                const request = objectStore.get(key);

                request.onsuccess = () => {
                    const entry = request.result as CacheEntry<T> | undefined;

                    if (!entry) {
                        resolve(null);
                        return;
                    }

                    // Check if entry has expired
                    if (entry.ttl) {
                        const age = Date.now() - entry.timestamp;
                        if (age > entry.ttl) {
                            console.log(`[Cache] Entry expired: ${store}/${key}`);
                            // Delete expired entry
                            this.invalidate(store, key);
                            resolve(null);
                            return;
                        }
                    }

                    console.log(`[Cache] Hit: ${store}/${key}`);
                    resolve(entry.value);
                };

                request.onerror = () => {
                    console.error(`[Cache] Get error: ${store}/${key}`, request.error);
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error(`[Cache] Get failed: ${store}/${key}`, error);
            return null;
        }
    }

    /**
     * Set item in cache
     */
    async set<T>(store: CacheStore, key: string, value: T, ttl?: number): Promise<void> {
        try {
            await this.init();
            if (!this.db) return;

            return new Promise((resolve, reject) => {
                const transaction = this.db!.transaction(store, "readwrite");
                const objectStore = transaction.objectStore(store);

                const entry: CacheEntry<T> = {
                    key,
                    value,
                    timestamp: Date.now(),
                    ttl,
                };

                const request = objectStore.put(entry);

                request.onsuccess = () => {
                    console.log(`[Cache] Set: ${store}/${key}${ttl ? ` (TTL: ${ttl}ms)` : ""}`);
                    resolve();
                };

                request.onerror = () => {
                    console.error(`[Cache] Set error: ${store}/${key}`, request.error);
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error(`[Cache] Set failed: ${store}/${key}`, error);
        }
    }

    /**
     * Invalidate cache entry or entire store
     */
    async invalidate(store: CacheStore, key?: string): Promise<void> {
        try {
            await this.init();
            if (!this.db) return;

            return new Promise((resolve, reject) => {
                const transaction = this.db!.transaction(store, "readwrite");
                const objectStore = transaction.objectStore(store);

                if (key) {
                    // Delete specific key
                    const request = objectStore.delete(key);
                    request.onsuccess = () => {
                        console.log(`[Cache] Invalidated: ${store}/${key}`);
                        resolve();
                    };
                    request.onerror = () => reject(request.error);
                } else {
                    // Clear entire store
                    const request = objectStore.clear();
                    request.onsuccess = () => {
                        console.log(`[Cache] Cleared store: ${store}`);
                        resolve();
                    };
                    request.onerror = () => reject(request.error);
                }
            });
        } catch (error) {
            console.error(`[Cache] Invalidate failed: ${store}/${key || "all"}`, error);
        }
    }

    /**
     * Clear all cache
     */
    async clear(): Promise<void> {
        try {
            await this.init();
            if (!this.db) return;

            const stores: CacheStore[] = ["leis", "parlamentares", "traducoes", "estatisticas"];

            await Promise.all(stores.map(store => this.invalidate(store)));
            console.log("[Cache] All caches cleared");
        } catch (error) {
            console.error("[Cache] Clear failed:", error);
        }
    }

    /**
     * Get cache statistics
     */
    async getStats(): Promise<CacheStats> {
        try {
            await this.init();
            if (!this.db) {
                return {
                    totalEntries: 0,
                    storeStats: {
                        leis: 0,
                        parlamentares: 0,
                        traducoes: 0,
                        estatisticas: 0,
                    },
                };
            }

            const stores: CacheStore[] = ["leis", "parlamentares", "traducoes", "estatisticas"];
            const storeStats: Record<CacheStore, number> = {
                leis: 0,
                parlamentares: 0,
                traducoes: 0,
                estatisticas: 0,
            };

            for (const store of stores) {
                const count = await new Promise<number>((resolve, reject) => {
                    const transaction = this.db!.transaction(store, "readonly");
                    const objectStore = transaction.objectStore(store);
                    const request = objectStore.count();

                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });

                storeStats[store] = count;
            }

            const totalEntries = Object.values(storeStats).reduce((sum, count) => sum + count, 0);

            return {
                totalEntries,
                storeStats,
            };
        } catch (error) {
            console.error("[Cache] Get stats failed:", error);
            return {
                totalEntries: 0,
                storeStats: {
                    leis: 0,
                    parlamentares: 0,
                    traducoes: 0,
                    estatisticas: 0,
                },
            };
        }
    }

    /**
     * Clean up expired entries
     */
    async cleanup(): Promise<void> {
        try {
            await this.init();
            if (!this.db) return;

            const stores: CacheStore[] = ["leis", "parlamentares", "traducoes", "estatisticas"];

            for (const store of stores) {
                const transaction = this.db.transaction(store, "readwrite");
                const objectStore = transaction.objectStore(store);
                const request = objectStore.openCursor();

                request.onsuccess = (event) => {
                    const cursor = (event.target as IDBRequest).result;
                    if (cursor) {
                        const entry = cursor.value as CacheEntry;

                        // Check if expired
                        if (entry.ttl) {
                            const age = Date.now() - entry.timestamp;
                            if (age > entry.ttl) {
                                cursor.delete();
                                console.log(`[Cache] Cleaned up expired: ${store}/${entry.key}`);
                            }
                        }

                        cursor.continue();
                    }
                };
            }

            console.log("[Cache] Cleanup completed");
        } catch (error) {
            console.error("[Cache] Cleanup failed:", error);
        }
    }
}

// Singleton instance
export const cache = new CacheManager();

// Default TTL values (in milliseconds)
export const TTL = {
    LEIS: 60 * 60 * 1000, // 1 hour
    PARLAMENTARES: 60 * 60 * 1000, // 1 hour
    ESTATISTICAS: 30 * 60 * 1000, // 30 minutes
    TRADUCOES: undefined, // No expiration for AI translations
} as const;

// Run cleanup on initialization (client-side only)
if (typeof window !== 'undefined') {
    cache.cleanup();

    // Run cleanup every hour
    setInterval(() => {
        cache.cleanup();
    }, 60 * 60 * 1000);
}
