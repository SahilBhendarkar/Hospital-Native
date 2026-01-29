import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { offlineQueueService } from '../api/services/offlineQueue.service';
import { useToast } from './ToastContext';
import { createAppointment, updateAppointment, deleteAppointment } from '../api/services/appointment.service';

interface OfflineSyncContextType {
    isOnline: boolean | null;
    isSyncing: boolean;
}

const OfflineSyncContext = createContext<OfflineSyncContextType | undefined>(undefined);

export const OfflineSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOnline, setIsOnline] = useState<boolean | null>(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const nowOnline = !!(state.isConnected && state.isInternetReachable);

            setIsOnline(prev => {
                if (prev === false && nowOnline === true) {
                    showToast('Back online! Syncing your changes...', 'info');
                    syncQueue();
                }
                return nowOnline;
            });
        });

        return () => unsubscribe();
    }, []);

    const syncQueue = async () => {
        if (isSyncing) return;
        setIsSyncing(true);

        const queue = await offlineQueueService.getQueue();
        if (queue.length === 0) {
            setIsSyncing(false);
            return;
        }

        try {
            for (const item of queue) {
                if (item.serviceName === 'appointment') {
                    try {
                        if (item.action === 'create') await createAppointment(item.data, true);
                        else if (item.action === 'update') await updateAppointment(item.data.id, item.data, true);
                        else if (item.action === 'delete') await deleteAppointment(item.data.id, true);

                        await offlineQueueService.removeFromQueue(item.id);
                    } catch (err) {
                        console.error('Failed to sync item:', item.id, err);
                    }
                }
            }
            showToast('All changes synced successfully!', 'success');
        } catch (error) {
            console.error('Sync failed:', error);
            showToast('Some changes failed to sync.', 'error');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <OfflineSyncContext.Provider value={{ isOnline, isSyncing }}>
            {children}
        </OfflineSyncContext.Provider>
    );
};

export const useOfflineSync = () => {
    const context = useContext(OfflineSyncContext);
    if (!context) throw new Error('useOfflineSync must be used within an OfflineSyncProvider');
    return context;
};
