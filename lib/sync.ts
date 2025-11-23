import { api } from "./api";
import {
    getPendingActions,
    removePendingAction,
    updatePendingAction,
    PendingAction
} from "./storage";

// Sync configuration
const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes
const MAX_RETRY_COUNT = 5;
const MAX_ACTION_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const INITIAL_RETRY_DELAY = 1000; // 1 second

// Action priorities (lower number = higher priority)
const ACTION_PRIORITY: Record<PendingAction['type'], number> = {
    "ADD_FAVORITO": 1,
    "REMOVE_FAVORITO": 1,
    "CREATE_ALERTA": 2,
    "DELETE_ALERTA": 2,
    "ADD_PREFERENCIA": 3,
    "REMOVE_PREFERENCIA": 3,
};

interface SyncStatus {
    isSyncing: boolean;
    lastSync: Date | null;
    pendingCount: number;
    isOnline: boolean;
}

class SyncManager {
    private syncInterval: NodeJS.Timeout | null = null;
    private isSyncing = false;
    private lastSync: Date | null = null;
    private isOnline = true;
    private listeners: Array<(status: SyncStatus) => void> = [];

    constructor() {
        if (typeof window !== 'undefined') {
            // Listen for online/offline events
            window.addEventListener('online', () => this.handleOnline());
            window.addEventListener('offline', () => this.handleOffline());

            // Check initial online status
            this.isOnline = navigator.onLine;

            // Start periodic sync
            this.startPeriodicSync();
        }
    }

    /**
     * Subscribe to sync status changes
     */
    subscribe(listener: (status: SyncStatus) => void): () => void {
        this.listeners.push(listener);

        // Immediately notify with current status
        listener(this.getStatus());

        // Return unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    /**
     * Get current sync status
     */
    getStatus(): SyncStatus {
        return {
            isSyncing: this.isSyncing,
            lastSync: this.lastSync,
            pendingCount: getPendingActions().length,
            isOnline: this.isOnline,
        };
    }

    /**
     * Notify all listeners of status change
     */
    private notifyListeners(): void {
        const status = this.getStatus();
        this.listeners.forEach(listener => listener(status));
    }

    /**
     * Handle online event
     */
    private handleOnline(): void {
        console.log("[SyncService] Connection restored");
        this.isOnline = true;
        this.notifyListeners();

        // Immediately try to sync pending actions
        this.syncPendingActions();
    }

    /**
     * Handle offline event
     */
    private handleOffline(): void {
        console.log("[SyncService] Connection lost");
        this.isOnline = false;
        this.notifyListeners();
    }

    /**
     * Start periodic sync
     */
    private startPeriodicSync(): void {
        if (this.syncInterval) return;

        this.syncInterval = setInterval(() => {
            if (this.isOnline && !this.isSyncing) {
                this.syncPendingActions();
            }
        }, SYNC_INTERVAL);

        console.log(`[SyncService] Periodic sync started (every ${SYNC_INTERVAL / 1000}s)`);
    }

    /**
     * Stop periodic sync
     */
    stopPeriodicSync(): void {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
            console.log("[SyncService] Periodic sync stopped");
        }
    }

    /**
     * Process all pending actions with retry and backoff
     */
    async syncPendingActions(): Promise<void> {
        if (typeof window === 'undefined' || !this.isOnline) {
            return;
        }

        if (this.isSyncing) {
            console.log("[SyncService] Sync already in progress, skipping");
            return;
        }

        this.isSyncing = true;
        this.notifyListeners();

        try {
            const pendingActions = getPendingActions();

            if (pendingActions.length === 0) {
                console.log("[SyncService] No pending actions");
                return;
            }

            console.log(`[SyncService] Processing ${pendingActions.length} pending actions...`);

            // Clean up old actions
            this.cleanupOldActions(pendingActions);

            // Sort by priority and timestamp
            const sortedActions = this.sortActionsByPriority(pendingActions);

            // Process each action
            for (const action of sortedActions) {
                try {
                    await this.processActionWithRetry(action);
                    removePendingAction(action.id);
                    console.log(`[SyncService] ✓ Action ${action.id} (${action.type}) synced successfully`);
                } catch (error) {
                    console.error(`[SyncService] ✗ Failed to sync action ${action.id}:`, error);

                    // Update retry count and last attempt
                    const retryCount = (action.retryCount || 0) + 1;

                    if (retryCount >= MAX_RETRY_COUNT) {
                        console.warn(`[SyncService] Max retries reached for action ${action.id}, removing`);
                        removePendingAction(action.id);
                    } else {
                        updatePendingAction(action.id, {
                            retryCount,
                            lastAttempt: Date.now(),
                        });
                    }
                }
            }

            this.lastSync = new Date();
            console.log(`[SyncService] Sync completed at ${this.lastSync.toISOString()}`);
        } finally {
            this.isSyncing = false;
            this.notifyListeners();
        }
    }

    /**
     * Process action with exponential backoff retry
     */
    private async processActionWithRetry(action: PendingAction): Promise<void> {
        const retryCount = action.retryCount || 0;
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);

        // Wait before retry (except first attempt)
        if (retryCount > 0) {
            console.log(`[SyncService] Retry ${retryCount} for action ${action.id} after ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        await processAction(action);
    }

    /**
     * Sort actions by priority and timestamp
     */
    private sortActionsByPriority(actions: PendingAction[]): PendingAction[] {
        return [...actions].sort((a, b) => {
            // First by priority
            const priorityDiff = ACTION_PRIORITY[a.type] - ACTION_PRIORITY[b.type];
            if (priorityDiff !== 0) return priorityDiff;

            // Then by timestamp (older first)
            return a.timestamp - b.timestamp;
        });
    }

    /**
     * Clean up actions older than MAX_ACTION_AGE
     */
    private cleanupOldActions(actions: PendingAction[]): void {
        const now = Date.now();
        const oldActions = actions.filter(action => {
            const age = now - action.timestamp;
            return age > MAX_ACTION_AGE;
        });

        if (oldActions.length > 0) {
            console.log(`[SyncService] Removing ${oldActions.length} old actions`);
            oldActions.forEach(action => removePendingAction(action.id));
        }
    }
}

/**
 * Process a single pending action
 */
async function processAction(action: PendingAction): Promise<void> {
    switch (action.type) {
        case "ADD_FAVORITO":
            await api.addFavorito(action.payload.leiId);
            break;
        case "REMOVE_FAVORITO":
            await api.removeFavorito(action.payload.leiId);
            break;
        case "CREATE_ALERTA":
            await api.createAlerta(action.payload.termo);
            break;
        case "DELETE_ALERTA":
            await api.deleteAlerta(action.payload.id);
            break;
        case "ADD_PREFERENCIA":
            await api.addPreferencia(action.payload.tema);
            break;
        case "REMOVE_PREFERENCIA":
            await api.removePreferencia(action.payload.tema);
            break;
        default:
            console.warn(`[SyncService] Unknown action type: ${(action as any).type}`);
    }
}

// Singleton instance
export const syncManager = new SyncManager();

// Legacy export for backward compatibility
export const SyncService = {
    syncPendingActions: () => syncManager.syncPendingActions(),
};
