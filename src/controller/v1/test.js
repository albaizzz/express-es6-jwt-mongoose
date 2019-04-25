const test = {
    get({user, body}, res){
        console.log(body)
        res.json(user);
    },
};

export default test;