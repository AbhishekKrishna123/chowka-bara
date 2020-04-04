'use strict';

import { ApiServer } from './api-server';
import { Database } from "./database";

export async function start(): Promise<void> {
    // const mongoConnector = new MongoConnector();
    const apiServer = new ApiServer();
    await Database.connect();
    await apiServer.start();

    const graceful = async () => {
        await Database.disconnect();
        await apiServer.stop();
        process.exit(0);
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
}