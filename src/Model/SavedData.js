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
/*
    removeFromHead() {
        if (this.length === 0) {
            return undefined;
        }

        const value = this.head.value;
        this.head = this.head.next;
        this.length--;

        return value;
    }

    find(val) {
        let thisNode = this.head;

        while(thisNode) {
            if(thisNode.value === val) {
                return thisNode;
            }

            thisNode = thisNode.next;
        }

        return thisNode;
    }

    remove(val) {
        if(this.length === 0) {
            return undefined;
        }

        if (this.head.value === val) {
            return this.removeFromHead();
        }

        let previousNode = this.head;
        let thisNode = previousNode.next;

        while(thisNode) {
            if(thisNode.value === val) {
                break;
            }

            previousNode = thisNode;
            thisNode = thisNode.next;
        }

        if (thisNode === null) {
            return undefined;
        }

        previousNode.next = thisNode.next;
        this.length--;
        return this;
    }
    */
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