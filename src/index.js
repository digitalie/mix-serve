const handler = require('serve-handler');
const http = require('http');

class Serve {
    /**
     * All dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        return ['serve-handler'];
    }

    /**
     * Register the component
     *
     * @param {Number} port
     * @param {String} host
     * @param {String} publicDir
     */
    register(port = 3000, host = 'localhost', publicDir = '.') {
        this.port = port;
        this.host = host;
        this.publicDir = publicDir;
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has executed.
     */
    boot() {
        if (this.isWatchMode()) {
            const server = http.createServer((request, response) =>
                handler(request, response, { public: this.publicDir })
            )

            server.listen(this.port, () => {
              console.log(`Running at http://${this.host}:${this.port}`);
            });
        }
    }

    /**
     * Check if webpack is running in watch mode
     *
     * @returns {Boolean}
     */
    isWatchMode() {
        // at the moment it only checks cli flag,
        // might need to also check configuration object
        return process.argv.includes('--watch');
    }
}

module.exports = Serve;
