const fetch = require('node-fetch');

const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
];

async function getTodosForEach() {
    console.log(`running getTodosForEach`);
    // "you can’t await the entire loop when using forEach"
    await urls.forEach(async (url, idx) => {
        const todo = await fetch(url);
        console.log(`received todo ${idx + 1}`, JSON.stringify(todo));
    });
    console.log('finished');
}

async function getTodosPromiseAll() {
    console.log(`running getTodosPromiseAll`);
    // This works for the last console.log, but doesn't keep the
    // requests in order.
    const promises = urls.map(async (url, idx) => {
        const todo = await fetch(url);
        console.log(`received todo ${idx + 1}`, JSON.stringify(todo));
    });
    await Promise.all(promises);
    console.log('finished');
}

async function getTodosInOrder() {
    console.log(`running getTodosInOrder`);
    // This one keeps the requests in order.
    for (const [idx, url] of urls.entries()) {
        const todo = await fetch(url);
        console.log(`received todo ${idx + 1}`, JSON.stringify(todo));
    }
    console.log('finished');
}
