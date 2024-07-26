/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** initializeIfEmpty(newNode): initialize the list if it is empty. */
  initializeIfEmpty(newNode) {
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return true;
    }
    return false;
  }

  /* 
  helper function: check if the list is empty and throw an error if it is.
  used by pop(), shift(), getAt(), setAt(), insertAt(), removeAt(), average()
   */
  checkIfEmpty() {
    if (!this.head) throw new Error("List is empty");
  }

  /* 
  helper function: validate the index. 
  used by getAt(), setAt(), insertAt(), removeAt()
  */
  validateIndex(idx, allowEqualLength = false) {
    if (idx < 0 || idx > this.length || (!allowEqualLength && idx === this.length)) {
      throw new Error("Index is invalid");
    }
  }

  /* 
  helper function: get node at idx without validation.
  used by getAt(), setAt(),
  */
  getNodeAt(idx) {
    let current = this.head;
    let count = 0;

    while (current !== null && count < idx) {
      current = current.next;
      count++;
    }

    return current;
  }

  /*
  helper function: get the node just before the specified index. 
  used by insertAt(), removeAt()
  */
  getNodeBefore(idx) {
    let current = this.head;
    let count = 0;

    while (count < idx - 1) {
      current = current.next;
      count++;
    }

    return current;
  }

  /* 
  helper function: update the tail if nodeToCheck.next is null
  used by removeAt(), insertAt()
  */
  updateTail(nodeToCheck, newTail) {
    if (nodeToCheck.next === null) {
      this.tail = newTail;
    }
  }

  /*
  helper function: update head and tail for insertAt and removeAt
  used by insertAt(), removeAt()
  */
  updateHeadAndTail(newHead, newTail, lengthCondition, tailValue) {
    this.head = newHead;
    if (this.length === lengthCondition) {
      this.tail = tailValue;
    }
  }

  /** push(val): add new value to end of list. */
  push(val) {
    const newNode = new Node(val);

    if (!this.initializeIfEmpty(newNode)) {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /** unshift(val): add new value to start of list. */
  unshift(val) {
    const newNode = new Node(val);

    if (!this.initializeIfEmpty(newNode)) {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    this.checkIfEmpty();

    let current = this.head;
    let previous = null;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    if (previous) {
      previous.next = null;
      this.tail = previous;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return current.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    this.checkIfEmpty();

    const removedNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return removedNode.val;
  }

  /** getAt(idx): get val at idx. */

  /** getAt(idx): get val at idx. */
  getAt(idx) {
    this.validateIndex(idx);
    return this.getNodeAt(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */
  setAt(idx, val) {
    this.validateIndex(idx);
    this.getNodeAt(idx).val = val;
    return val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    this.validateIndex(idx, true);

    const newNode = new Node(val);

    if (idx === 0) {
      this.updateHeadAndTail(newNode, newNode, 0, newNode);
    } else {
      const current = this.getNodeBefore(idx);
      newNode.next = current.next;
      current.next = newNode;

      this.updateTail(newNode, newNode);
    }

    this.length++;
    return { idx: idx, val: val };
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    this.validateIndex(idx);

    let removedNode;

    if (idx === 0) {
      removedNode = this.head;
      this.updateHeadAndTail(this.head.next, null, 1, null);
    } else {
      const current = this.getNodeBefore(idx);
      removedNode = current.next;
      current.next = removedNode.next;

      this.updateTail(removedNode, current);
    }

    this.length--;
    return { idx: idx, val: removedNode.val };
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
