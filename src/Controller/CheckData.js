export default function timedCount() {
    fetch('http://127.0.0.1:4000/customer', {
    }).then((resp) => resp.json()) // Transform the data into json
        .then(data => {

           // POST DATA TO VIEW SECTION.
            postMessage(data)

            //Prints result from `response.json()` in getRequest
        })

}
