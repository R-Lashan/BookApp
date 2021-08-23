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

    async getUserForRegister(email){
        var status = 0;
        var result =
            fetch(`${baseUrl}users/email/${email}`)
            .then((response) => {
                status = response.status;
                response.json()
            })
            .then((a) => {
                console.log(a)
                var data = {
                    status: status,
                    user: {...a}
                }
                return data;
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

    async updateUser(user){
        var result =
            fetch(`${baseUrl}users`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteUser(userId){
        var result =
            fetch(`${baseUrl}users/${userId}`, {
                method: 'DELETE',
            })
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

    async getInvoicesByUserId(userId){
        var result =
            fetch(`${baseUrl}invoices/users/${userId}`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async postInvoice(invoice){
        var result =
            fetch(`${baseUrl}invoices`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invoice)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API;