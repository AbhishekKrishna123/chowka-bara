import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import * as http from 'http';
import cors from "cors";
import { Server } from "typescript-rest";
import app from "./app";


export class ApiServer {

    public PORT: number = +process.env.PORT || 3000;

    private app: express.Application;
    private server: http.Server = null;

    constructor() {
        // create Express server
        this.app = app;
    }

    /**
     * start the server
     */
    public async start() {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }

                // TODO: replace with Morgan call
                // tslint:disable-next-line:no-console
                console.log(`Listening to http://localhost:${this.PORT}`);

                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public async stop(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }
}
