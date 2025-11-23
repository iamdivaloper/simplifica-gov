// Local storage module for SimplificaGov
// Handles localStorage persistence with backend synchronization

import { PreferenciaTema, Alerta } from "./api";

const STORAGE_KEYS = {
    FAVORITOS: "simplificagov_favoritos",
    PREFERENCIAS: "simplificagov_preferencias",
    ALERTAS: "simplificagov_alertas",
    LAST_SYNC: "simplificagov_last_sync",
    PENDING_ACTIONS: "simplificagov_pending_actions",
} as const;

export interface PendingAction {
    id: string;
    type: "ADD_FAVORITO" | "REMOVE_FAVORITO" | "CREATE_ALERTA" | "DELETE_ALERTA" | "ADD_PREFERENCIA" | "REMOVE_PREFERENCIA";
    payload: any;
    timestamp: number;
    retryCount?: number;
    lastAttempt?: number;
    priority?: number;
}

/**
 * Save favoritos to localStorage
 */
export function saveFavoritos(favoritos: string[]): void {
    try {
        localStorage.setItem(STORAGE_KEYS.FAVORITOS, JSON.stringify(favoritos));
    } catch (error) {
        console.error("Failed to save favoritos to localStorage:", error);
    }
}

/**
 * Get favoritos from localStorage
 */
export function getFavoritos(): string[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.FAVORITOS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to get favoritos from localStorage:", error);
        return [];
    }
}

/**
 * Add a single favorito to localStorage
 */
export function addFavoritoLocal(leiId: string): void {
    const favoritos = getFavoritos();
    if (!favoritos.includes(leiId)) {
        favoritos.push(leiId);
        saveFavoritos(favoritos);
    }
}

/**
 * Remove a single favorito from localStorage
 */
export function removeFavoritoLocal(leiId: string): void {
    const favoritos = getFavoritos();
    const filtered = favoritos.filter(id => id !== leiId);
    saveFavoritos(filtered);
}

/**
 * Check if a lei is favorited locally
 */
export function isFavoritoLocal(leiId: string): boolean {
    const favoritos = getFavoritos();
    return favoritos.includes(leiId);
}

/**
 * Save preferencias to localStorage
 */
export function savePreferencias(preferencias: PreferenciaTema[]): void {
    try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCIAS, JSON.stringify(preferencias));
    } catch (error) {
        console.error("Failed to save preferencias to localStorage:", error);
    }
}

/**
 * Get preferencias from localStorage
 */
export function getPreferencias(): PreferenciaTema[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCIAS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to get preferencias from localStorage:", error);
        return [];
    }
}

/**
 * Add a single preferencia to localStorage
 */
export function addPreferenciaLocal(tema: string): void {
    const preferencias = getPreferencias();
    if (!preferencias.find(p => p.tema === tema)) {
        preferencias.push({
            tema,
            created_at: new Date().toISOString(),
        });
        savePreferencias(preferencias);
    }
}

/**
 * Remove a single preferencia from localStorage
 */
export function removePreferenciaLocal(tema: string): void {
    const preferencias = getPreferencias();
    const filtered = preferencias.filter(p => p.tema !== tema);
    savePreferencias(filtered);
}

/**
 * Save alertas to localStorage
 */
export function saveAlertas(alertas: Alerta[]): void {
    try {
        localStorage.setItem(STORAGE_KEYS.ALERTAS, JSON.stringify(alertas));
    } catch (error) {
        console.error("Failed to save alertas to localStorage:", error);
    }
}

/**
 * Get alertas from localStorage
 */
export function getAlertas(): Alerta[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.ALERTAS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to get alertas from localStorage:", error);
        return [];
    }
}

/**
 * Add a single alerta to localStorage
 */
export function addAlertaLocal(alerta: Alerta): void {
    const alertas = getAlertas();
    if (!alertas.find(a => a.id === alerta.id)) {
        alertas.push(alerta);
        saveAlertas(alertas);
    }
}

/**
 * Remove a single alerta from localStorage
 */
export function removeAlertaLocal(id: string): void {
    const alertas = getAlertas();
    const filtered = alertas.filter(a => a.id !== id);
    saveAlertas(filtered);
}

/**
 * Mark alerta as read in localStorage
 */
export function markAlertaAsReadLocal(id: string): void {
    const alertas = getAlertas();
    const updated = alertas.map(a => a.id === id ? { ...a, read: true } : a);
    saveAlertas(updated);
}

/**
 * Save last sync timestamp
 */
export function saveLastSync(): void {
    try {
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (error) {
        console.error("Failed to save last sync timestamp:", error);
    }
}

/**
 * Get last sync timestamp
 */
export function getLastSync(): string | null {
    try {
        return localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    } catch (error) {
        console.error("Failed to get last sync timestamp:", error);
        return null;
    }
}

/**
 * Sync local data with backend
 * This should be called periodically or when user logs in
 */
export async function syncWithBackend(
    api: {
        getFavoritos: () => Promise<any[]>;
        getPreferencias: () => Promise<PreferenciaTema[]>;
    }
): Promise<void> {
    try {
        // Fetch data from backend
        const [backendFavoritos, backendPreferencias] = await Promise.all([
            api.getFavoritos(),
            api.getPreferencias(),
        ]);

        // Merge with local data (backend takes precedence)
        const localFavoritos = getFavoritos();
        const mergedFavoritos = Array.from(
            new Set([...backendFavoritos.map(f => f.id), ...localFavoritos])
        );
        saveFavoritos(mergedFavoritos);

        // Merge preferencias
        const localPreferencias = getPreferencias();
        const mergedPreferencias = [...backendPreferencias];

        // Add local preferencias that don't exist in backend
        localPreferencias.forEach(local => {
            if (!mergedPreferencias.find(p => p.tema === local.tema)) {
                mergedPreferencias.push(local);
            }
        });

        savePreferencias(mergedPreferencias);
        saveLastSync();

        console.log("Sync with backend completed successfully");
    } catch (error) {
        console.error("Failed to sync with backend:", error);
        // Don't throw - we want to continue even if sync fails
    }
}

/**
 * Save a pending action to localStorage
 */
export function savePendingAction(action: PendingAction): void {
    try {
        const actions = getPendingActions();
        actions.push(action);
        localStorage.setItem(STORAGE_KEYS.PENDING_ACTIONS, JSON.stringify(actions));
    } catch (error) {
        console.error("Failed to save pending action:", error);
    }
}

/**
 * Get all pending actions from localStorage
 */
export function getPendingActions(): PendingAction[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PENDING_ACTIONS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to get pending actions:", error);
        return [];
    }
}

/**
 * Update a pending action in localStorage
 */
export function updatePendingAction(id: string, updates: Partial<PendingAction>): void {
    try {
        const actions = getPendingActions();
        const updated = actions.map(a => a.id === id ? { ...a, ...updates } : a);
        localStorage.setItem(STORAGE_KEYS.PENDING_ACTIONS, JSON.stringify(updated));
    } catch (error) {
        console.error("Failed to update pending action:", error);
    }
}

/**
 * Remove a pending action from localStorage
 */
export function removePendingAction(id: string): void {
    try {
        const actions = getPendingActions();
        const filtered = actions.filter(a => a.id !== id);
        localStorage.setItem(STORAGE_KEYS.PENDING_ACTIONS, JSON.stringify(filtered));
    } catch (error) {
        console.error("Failed to remove pending action:", error);
    }
}

/**
 * Clear all local storage data
 */
export function clearAllStorage(): void {
    try {
        localStorage.removeItem(STORAGE_KEYS.FAVORITOS);
        localStorage.removeItem(STORAGE_KEYS.PREFERENCIAS);
        localStorage.removeItem(STORAGE_KEYS.ALERTAS);
        localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
        localStorage.removeItem(STORAGE_KEYS.PENDING_ACTIONS);
    } catch (error) {
        console.error("Failed to clear storage:", error);
    }
}
