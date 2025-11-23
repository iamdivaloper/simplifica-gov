import { useState, useEffect } from "react";
import { syncManager } from "@/lib/sync";

interface SyncStatus {
    isSyncing: boolean;
    lastSync: Date | null;
    pendingCount: number;
    isOnline: boolean;
}

/**
 * Hook to monitor sync status
 * Provides real-time updates on synchronization state
 */
export function useSyncStatus() {
    const [status, setStatus] = useState<SyncStatus>({
        isSyncing: false,
        lastSync: null,
        pendingCount: 0,
        isOnline: true,
    });

    useEffect(() => {
        // Subscribe to sync status changes
        const unsubscribe = syncManager.subscribe((newStatus) => {
            setStatus(newStatus);
        });

        // Cleanup on unmount
        return unsubscribe;
    }, []);

    /**
     * Manually trigger sync
     */
    const syncNow = () => {
        syncManager.syncPendingActions();
    };

    return {
        ...status,
        syncNow,
    };
}
