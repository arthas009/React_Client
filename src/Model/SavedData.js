/*
*
* A simle Linked List
* To hold and storage the data of application
* 'objects' are the current JSON objects of current tab's dragged XML pieces
* 'ids' are the current dragged XML pieces's ID's
*
*/


class SavedData {
    constructor(objects,ids) {
        this.head = new Node(objects,ids);
    }

    add(objects,ids) {
        const newNode = new Node(objects,ids);
        var current = this.head;
        while (current.next) {
            current = current.next;
        }

        // add node
        current.next = newNode;
    }

    /*
    *
    * This function returns the node we search with a spesific index 'toSearch' .
    *
    */
    getNodeAt(toSearch)
    {
        let count = 1;
        let gezici = this.head;
        while(count < toSearch && gezici.next != null)
        {
            gezici = gezici.next;
            count++;
        }
        return gezici;
    }
    /*
    *
    * This function changes the node value at index 'toSearch' .
    *
    */
    change(toSearch,newids,newobjects)
    {
        let count = 1;
        let gezici = this.head;
        while(count < toSearch && gezici.next != null)
        {
            gezici = gezici.next;
            count++;
        }
        gezici.ids = newids;
        gezici.objects = newobjects;
    }
}
class Node
{

    constructor(objects,ids) {
         this.objects = objects;
         this.ids = ids;
         this.next =  null;
    }
}
export default SavedData;