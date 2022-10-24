const http = new HttpService();

let xyz = document.getElementById('console-log');
const getButton = document.getElementById('get-story');
const story_id = document.getElementById('story-id');
const getStoryById = document.getElementById('get-story-id');
const cleartext = document.getElementById('clear');
let story;

getButton.onclick = async () => {
    http.get('story').then((res) => {
        console.dir(res);
        story = res.data[0].story_content;
        xyz.innerText = story;
});
}

getStoryById.onclick = () => {
    let path = `story/${story_id.value}`;
    http.get(path).then((res) => {
        if (res.data.story_content) {
            story = res.data.story_content;
            xyz.innerText = story;
        } else {
            xyz.innerText = 'No story found';
        }
    })
};


cleartext.onclick = () => {
    xyz.innerText = "";
}





const post_story = document.getElementById('post_story');
const post_story_content = document.getElementById('post_story_content');
const post_story_title = document.getElementById('post_story_title');

post_story.onclick = async () => {
    http.post('story', post_story_content.value, post_story_title.value).then((res) => {
        console.dir(res);
});
}

const update_story = document.getElementById('update_story');
const update_story_id = document.getElementById('update_story_id');
const update_story_content = document.getElementById('update_story_content');
const update_story_title = document.getElementById('update_story_title');

update_story.onclick = async () => {
    http.put(update_story_id.value, update_story_content.value, update_story_title.value).then((res) => {
        console.dir(res);
});
}


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