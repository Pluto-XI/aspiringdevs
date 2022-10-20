const http = new HttpService();

let xyz = document.getElementById('console-log');
let story;

http.get('story').then((res) => {
    story = res.data[0].story_content;
    xyz.innerText = story;
});






//import http
//http get
//set response to variable
//assign element value to response value


//Event loop magic: 
/*
Each file is read top to bottom,
as soon as a line is read it is executed
it does not wait for anything
when it hits the end it exits.

To await something you need to use the stack,
call a function to put it in the stack
The stack is registered on the event loop, last in first out.

callback functions can be used.

async functions when a value is returned can be used in .then with a response passed in as argument

async functions return a promise

My element was null because the html wasn't loaded yet?

*/