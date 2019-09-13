import app from './App';
var port = process.env.PORT || 3000;
app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("server is listening on " + port);
});
