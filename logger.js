module.exports = {
    init: function(node_env) {
        const {createLogger, format, transports} = require('winston');
        const {combine, timestamp, printf} = format;
        const logDir = 'log';

        //LOGGER
        const myFormat = printf(info => {
            return `${info.timestamp}· ${info.level}: ${info.message}`;
        });
        const logger = createLogger({
            level: 'info',
            format: combine(
                timestamp(),
                myFormat
            ),
            transports: [
                new (transports.Console)({
                    colorize: true,
                }),
                new transports.File({
                    filename: `${logDir}/info.log`,
                })
            ]
        });

        if (node_env !== 'production') {
            logger.add(new transports.Console({
                format: format.simple()
            }));
        }
        return logger;
    }
};