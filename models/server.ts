import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import passport from "passport";
import session from "express-session";

import apiPaths from "../routes/routes";
import { ConnectionDB } from "../db/conexion";
import opeRouter from "../modules/operativo/ope.routes";
import sopRouter from "../modules/soporte/sop.routes";
import segRouter from "../modules/seguridad/seg.routes";



class Server {
    private app: Application;
    private port: string;
    private connectionDB = new ConnectionDB();
    public globalUsername: string;

    constructor() {
        this.globalUsername = '';
        this.app = express();
        this.connectionDB.connect();
        this.port = process.env.PORT || '3500';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(session({ secret: ('232938r0fhsdnco23'), resave: false, saveUninitialized: false }))
    }

    routes() {
        this.app.use( apiPaths.operativo, opeRouter ),
        this.app.use( apiPaths.soporte, sopRouter ),
        this.app.use( apiPaths.seguridad, segRouter )
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }
}

export default Server;