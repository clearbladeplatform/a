function testCollectionsUtilLib(req, resp){
    log("Executing testCollectionsUtilLib service...");
    
    ClearBlade.init({request: req});
    
    CollectionsUtil.getNextId("AssetType", function(err, data) {
        if (!err) {
            resp.success("Next id: " + data.nextInt);
        }
        else {
            resp.error("An error occurred while calling CollectionsUtil.getNextId. " + JSON.stringify(err));
        }
    });
}