import express from 'express';
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        var router = express.Router();
        router.get('/', function (_req, res) {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    };
    return App;
}());
export default new App().express;
