import Config from "./config";
var baseUrl = Config.api_url;

class API {
    async postUser(user){
        var result =
            fetch(`${baseUrl}users`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)           
            })
            .then((response) => response.json())
            .then((a) => {
                console.log(a);
                return a;
            });
        return result;
    }
}

export default API;