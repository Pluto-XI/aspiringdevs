const http = new HttpService();


const getButton = document.getElementById('get-story');
const story_id = document.getElementById('story-id');
const getStoryById = document.getElementById('get-story-id');
const cleartext = document.getElementById('clear');
const storyTable = document.getElementById('story-table');

const id_title = document.getElementById('id-title')
const id_story = document.getElementById('id-story')

const username = document.getElementById('username');
const password = document.getElementById('password');

function combineHeader(username, password) {
    return `${username} ${password}`;
}



getButton.onclick = async () => {
    while (storyTable.lastChild) {
        storyTable.removeChild(storyTable.lastChild);
    }

    let tableHeaders = document.createElement('tr');
    let tableId = document.createElement('th');
    let tableTitle = document.createElement('th');
    let tableStory = document.createElement('th');

    tableId.textContent = "Story ID";
    tableTitle.textContent = "Title";
    tableStory.textContent = "Story";

    tableHeaders.appendChild(tableId);
    tableHeaders.appendChild(tableTitle);
    tableHeaders.appendChild(tableStory);

    storyTable.appendChild(tableHeaders);

    http.get('story').then((res) => {
        console.dir(res);
        for (let i = 0; i < res.data.length; i++) {

            //create table row
            let tableRow = document.createElement('tr');

            //Create table data
            let storyId = document.createElement('td');
            let storyTitle = document.createElement('td');
            let story = document.createElement('td');


            //assign table content
            storyId.textContent = res.data[i].id;
            storyTitle.textContent = res.data[i].story_title;
            story.textContent = res.data[i].story_content;

            //append table content to tableRow
            tableRow.appendChild(storyId);
            tableRow.appendChild(storyTitle);
            tableRow.appendChild(story);

            //Add to parent
            storyTable.appendChild(tableRow);
        }
});
}

getStoryById.onclick = () => {
    let path = `story/${story_id.value}`;
    http.get(path).then((res) => {
        if (res.data.story_content) {
            id_title.innerText = res.data.story_title;
            id_story.innerText = res.data.story_content;
        } else {
            id_title.innerText = 'No story found';
        }
    })
};


/* <input id="user-stories" type="text" placeholder="Username">
<input id="get-story-by-username" type="button" value="Get /story/username"> 

 * ### The `/user_stories/$username` Endpoint
 * This is an optional endpoint that you can implement if you'd like more practice.  Again, it is not expected that you implement this endpoint.  It's only here for additional practice if you want it.
 *   - This endpoint will return all the stories stored in the database for the username provided.
 *   - Only the GET method is available for this endpoint
 *   - A reminder: when passing in the username, don't include the `$` symbol
 *   
 */

const getStoryByUser = document.getElementById('get-story-by-username'); 
const getStoryByUserInput = document.getElementById('user-stories');

getStoryByUser.onclick = () => {
    while (storyTable.lastChild) {
        storyTable.removeChild(storyTable.lastChild);
    }

    let tableHeaders = document.createElement('tr');
    let tableId = document.createElement('th');
    let tableTitle = document.createElement('th');
    let tableStory = document.createElement('th');

    tableId.textContent = "Story ID";
    tableTitle.textContent = "Title";
    tableStory.textContent = "Story";

    tableHeaders.appendChild(tableId);
    tableHeaders.appendChild(tableTitle);
    tableHeaders.appendChild(tableStory);

    storyTable.appendChild(tableHeaders);

    let path = `user_stories/${getStoryByUserInput.value}`;
    http.get(path)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {

                //create table row
                let tableRow = document.createElement('tr');
    
                //Create table data
                let storyId = document.createElement('td');
                let storyTitle = document.createElement('td');
                let story = document.createElement('td');
    
    
                //assign table content
                storyId.textContent = res.data[i].id;
                storyTitle.textContent = res.data[i].story_title;
                story.textContent = res.data[i].story_content;
    
                //append table content to tableRow
                tableRow.appendChild(storyId);
                tableRow.appendChild(storyTitle);
                tableRow.appendChild(story);
    
                //Add to parent
                storyTable.appendChild(tableRow);
            }
        }).catch((error) => {
            alert('No Stories Found With Username: ' + getStoryByUserInput.value);
        })
}




cleartext.onclick = () => {
    id_title.innerText = "";
    id_story.innerText = "";
}





const post_story = document.getElementById('post_story');
const post_story_content = document.getElementById('post_story_content');
const post_story_title = document.getElementById('post_story_title');

post_story.onclick = async () => {
    http.post('story', post_story_content.value, post_story_title.value, combineHeader(username.value, password.value))
        .then((res) => {
            alert("Story created");
        }).catch((error) => {
            alert("Failed to create");
            console.log(error);
        });
}

const update_story = document.getElementById('update_story');
const update_story_id = document.getElementById('update_story_id');
const update_story_content = document.getElementById('update_story_content');
const update_story_title = document.getElementById('update_story_title');

update_story.onclick = async () => {
    http.put(update_story_id.value, update_story_content.value, update_story_title.value, combineHeader(username.value, password.value))
    .then((res) => {
        alert("Story Updated");
    }).catch((error) => {
        alert("Failed to Update");
        console.log(error);
    });
}


const delete_id = document.getElementById('delete-id');
const deleteStoryById = document.getElementById('delete-story-id');

deleteStoryById.onclick = () => {
    http.delete(delete_id.value, combineHeader(username.value, password.value))
    .then((res) => {
        alert("Story Deleted");
    }).catch((error) => {
        alert("Failed to Delete");
        console.log(error);
    });
};


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