"use client";

import { Cloud, CloudOff, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { useSyncStatus } from "@/hooks/useSyncStatus";
import { cn } from "@/lib/utils";

/**
 * Visual indicator for sync status
 * Shows in navbar/header to inform users about sync state
 */
export function SyncIndicator() {
    const { isSyncing, pendingCount, isOnline, lastSync, syncNow } = useSyncStatus();

    // Determine status color and icon
    const getStatusInfo = () => {
        if (!isOnline) {
            return {
                icon: CloudOff,
                color: "text-red-500",
                bgColor: "bg-red-50 dark:bg-red-950",
                label: "Offline",
                description: pendingCount > 0
                    ? `${pendingCount} ${pendingCount === 1 ? 'ação pendente' : 'ações pendentes'}`
                    : "Sem conexão",
            };
        }

        if (isSyncing) {
            return {
                icon: RefreshCw,
                color: "text-blue-500",
                bgColor: "bg-blue-50 dark:bg-blue-950",
                label: "Sincronizando",
                description: `${pendingCount} ${pendingCount === 1 ? 'item' : 'itens'}`,
                animate: true,
            };
        }

        if (pendingCount > 0) {
            return {
                icon: AlertCircle,
                color: "text-yellow-500",
                bgColor: "bg-yellow-50 dark:bg-yellow-950",
                label: "Pendente",
                description: `${pendingCount} ${pendingCount === 1 ? 'ação' : 'ações'}`,
            };
        }

        return {
            icon: CheckCircle2,
            color: "text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950",
            label: "Sincronizado",
            description: lastSync
                ? `Última sync: ${formatLastSync(lastSync)}`
                : "Tudo em dia",
        };
    };

    const statusInfo = getStatusInfo();
    const Icon = statusInfo.icon;

    return (
        <div className="flex items-center gap-2">
            {/* Desktop view - full info */}
            <div className="hidden md:flex items-center gap-2">
                <button
                    onClick={syncNow}
                    disabled={isSyncing || !isOnline}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all",
                        statusInfo.bgColor,
                        "hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    title={statusInfo.description}
                >
                    <Icon
                        className={cn(
                            "h-4 w-4",
                            statusInfo.color,
                            statusInfo.animate && "animate-spin"
                        )}
                    />
                    <div className="flex flex-col items-start">
                        <span className={cn("text-xs font-medium", statusInfo.color)}>
                            {statusInfo.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            {statusInfo.description}
                        </span>
                    </div>
                </button>
            </div>

            {/* Mobile view - icon only with badge */}
            <div className="md:hidden relative">
                <button
                    onClick={syncNow}
                    disabled={isSyncing || !isOnline}
                    className={cn(
                        "p-2 rounded-lg transition-all",
                        statusInfo.bgColor,
                        "hover:opacity-80 disabled:opacity-50"
                    )}
                    title={`${statusInfo.label}: ${statusInfo.description}`}
                >
                    <Icon
                        className={cn(
                            "h-5 w-5",
                            statusInfo.color,
                            statusInfo.animate && "animate-spin"
                        )}
                    />
                </button>

                {/* Badge for pending count */}
                {pendingCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {pendingCount > 9 ? '9+' : pendingCount}
                    </span>
                )}
            </div>
        </div>
    );
}

/**
 * Format last sync time in a human-readable way
 */
function formatLastSync(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "agora";
    if (diffMins === 1) return "1 min atrás";
    if (diffMins < 60) return `${diffMins} mins atrás`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hora atrás";
    if (diffHours < 24) return `${diffHours} horas atrás`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "1 dia atrás";
    return `${diffDays} dias atrás`;
}
