const getTopUsers = require('../../models/user/getTopUsers');
const NodeCache = require( "node-cache" );
const cache = new NodeCache({stdTTL: 30 * 60, checkperiod: 31 * 60});
module.exports = async (req, res) => {
    if(cache.has('topUsers')){
        return res.send({users: cache.get('topUsers')});
    }else{
        try {
            let users = await getTopUsers();
            cache.set('topUsers', users, 12 * 60 * 60);
            return res.send({users: users});
        } catch {
            return res.send({users: []});
        }
    }
}