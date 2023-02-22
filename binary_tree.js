class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

// Depth First Traversal --> JS stack is an array basically only using .push and .pop --> O(n) time complexity

// Depth First Traversal --> Interative
const depthFirstValues = (root) => {
    // if root is null, return empty array
    if (root === null) return [];

    // create a stack and push root into it
    const stack = [root];
    const result = [];

    while (stack.length > 0) {
        // pop the top node off the stack
        const current = stack.pop();
        // push the value of the node into the result array
        result.push(current.value);

        // push the right and left children of the node into the stack
        if (current.right) stack.push(current.right);
        if (current.left) stack.push(current.left);
    }

    return result;
}

// Depth First Traversal --> Recursive
const recursiveDepthFirstValues = (root) => {
    if (root === null) return [];

    const leftValues = recursiveDepthFirstValues(root.left);
    const rightValues = recursiveDepthFirstValues(root.right);
    
    return [root.value, ...leftValues, ...rightValues];
}

// Breadth First Traversal --> JS queue is an array basically only using .push and .shift --> O(n) time complexity
const breadthFirstValues = (root) => {
    if (root === null) return [];

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current.value);

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }

    return result;
}

// Find a value in a tree
const findTreeValue = (root, target) => {
    if (root === null) return false;

    const queue = [root];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.value === target) return true;

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);

    }

    return false;
}

const findTreeValueRecursive = (root, target) => {
    if (root === null) return false;
    if (root.value === target) return true;

    return findTreeValueRecursive(root.left, target) || findTreeValueRecursive(root.right, target);
}




// console.log(depthFirstValues(a)); // ['a', 'b', 'd', 'e', 'c', 'f']
// console.log(recursiveDepthFirstValues(a)); // ['a', 'b', 'd', 'e', 'c', 'f']
// console.log(breadthFirstValues(a)); // ['a', 'b', 'c', 'd', 'e', 'f']
// console.log(findTreeValue(a, 'a')); // true
console.log(findTreeValueRecursive(a, 'f')); // true
