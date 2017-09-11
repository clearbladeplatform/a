CollectionsUtil = {};

/*
 * Get the next id for a given collection (mimics a DB sequence).
 * Params:
 *   1. collection: the name of the collection 
 *   2. callback: callback function to be executed by the caller method
 * Returns the next integer corresponding to the next id.
 */
CollectionsUtil.getNextId = function(collection, callback) {
    
    //Fetch id from collection descending...
    var query = ClearBlade.Query({collectionName: collection});
    query.columns(["id"]);
    query.descending("id");
    query.fetch(function(err, data) {
        if (err) {            
            log("CollectionsUtil-getNextId: Error while fetching column 'id' from collection '" + collection + "'. " + JSON.stringify(err));            
            callback(err, data);        
            
        } else {            
            //Return first row + 1... 
            log("CollectionsUtil-getNextId: Total number of rows retrieved: " + data.TOTAL);
            var nextInt = 1;
            if (data.TOTAL > 0) {
                nextInt = data.DATA[0].id + 1;
            }
            callback(err, {"nextInt": nextInt});        
        } 
    });
};
