module.exports = app => {
    app.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, () => {
        console.log("API iniciada.");
    });
}