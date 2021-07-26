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
                return a;
            });
        return result;
    }

    async getUser(email){
        var result =
            fetch(`${baseUrl}users/email/${email}`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async addBook(book){
        var result =
            fetch(`${baseUrl}books`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateBook(book){
        var result =
            fetch(`${baseUrl}books`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteBook(bookId){
        var result =
            fetch(`${baseUrl}books/${bookId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllBooks(){
        var result =
            fetch(`${baseUrl}books`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API;