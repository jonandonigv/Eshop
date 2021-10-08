import winston from 'winston';

const options: winston.LoggerOptions = {
    transport: [
        new winston.transport.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston.transport.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Loggin initialized at debug level");
}

export default logger;