/* 
    Deconstructing is the same as drilling inside of an object - opening it up and grabbing the key/values inside
    In this file the object "req" will be passed into all of the functions
    req == request
*/
module.exports = {
    // you grab user from req object
    getUser: function({ user }) {
        return { user }
    },
    // you grab user from req object
    // you grab "author" from the req object
    getUserAndAuthor: function({ user, user:{ local: { email: author }}}) {
        /*
            this is where things get a little more complex
            you are grabbing multiple values, drilling deeper into the object
            you grab user and then specify that you want another key/value
                { user, ... }
            you grab the individials email going through same process as before
                {..., user:{ local: { email }}}
            you then rename the person's email as author
                {..., user:{ local: { email: author }}}
        */
        return { user, author }
    },
    // searches return a query attached to the request
    getUserAndKey: function({ user, query:{ key } }) {
        return { user, key }
    },
    // posts return a body attached to the request
    getGroupInfo: function({ body:{ name, msg, rules, key}, user:{ local:{ email: author }}}) {
        return { name, msg, rules, key, author }
    },
    getOldNameAndGroupInfo: function({ body:{ name, msg, rules, key, oldName }, user:{ local: { email: author }}}) {
        return { name, msg, rules, key, oldName, author }
    }
}