
class SavedData
{
    static currentTabNo =1;
    static data = {
        Tabs:
            {
            objects:[],
            ids:[],
            next:null
            }
    };

    static getData =() =>
    {
        return this.data;
    }
    static setData = (data) =>
    {
        this.data = data;
    }
    static getCurrentTabNo =()=>
    {
        return this.currentTabNo;
    }
    static setCurrentTabNo = (currentTabNo) =>
    {
        this.currentTabNo = currentTabNo;
    }
}

export default SavedData;

/*
class LinkedList {
    constructor(value) {
        this.head = null;
        this.objects = null;
        this.length = 0;
        this.addToHead(value);
    }

    addToHead(value) {
        const newNode = { value }; // 1
        newNode.next = this.head;  // 2
        this.head = newNode;       // 3
        this.length++;
        return this;
    }
}*/