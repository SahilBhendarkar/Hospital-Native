import { storage } from '../../utils/storage';

export type QueueAction = 'create' | 'update' | 'delete';

export interface QueuedRequest {
    id: string;
    action: QueueAction;
    serviceName: 'appointment';
    data: any;
    timestamp: number;
}

const STORAGE_KEY = 'offline_queue';

export const offlineQueueService = {
    async getQueue(): Promise<QueuedRequest[]> {
        const queue = await storage.load(STORAGE_KEY);
        return queue || [];
    },

    async addToQueue(request: Omit<QueuedRequest, 'id' | 'timestamp'>): Promise<void> {
        const queue = await this.getQueue();
        const newRequest: QueuedRequest = {
            ...request,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
        };
        await storage.save(STORAGE_KEY, [...queue, newRequest]);
    },

    async clearQueue(): Promise<void> {
        await storage.remove(STORAGE_KEY);
    },

    async removeFromQueue(id: string): Promise<void> {
        const queue = await this.getQueue();
        const filteredQueue = queue.filter(req => req.id !== id);
        await storage.save(STORAGE_KEY, filteredQueue);
    }
};
