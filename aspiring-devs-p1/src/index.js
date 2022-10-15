//Construct new instance of http service
const httpService = window.httpService;
const http = new httpService();


http.get().then((value) => {
  console.log('received value: ' + value);
})


// let story = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a turpis feugiat, lobortis nulla id, rutrum nisi. In imperdiet tempus velit, malesuada porttitor nunc congue id. Praesent varius, turpis vel faucibus iaculis, dolor orci fermentum ipsum, eget pharetra magna tortor eget justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet volutpat enim a dapibus. Nulla et porttitor elit. Curabitur id mollis urna, eu consequat nisi. Nam a elit dignissim, tincidunt ligula non, fringilla quam.

// Phasellus mattis consectetur arcu, nec pharetra risus pharetra nec. Vivamus libero dui, posuere eu massa at, fermentum lobortis libero. Nunc velit ante, laoreet sed faucibus ut, commodo aliquet ipsum. Aliquam id turpis libero. Fusce lobortis ipsum ac augue sollicitudin malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas at lorem at sapien scelerisque feugiat. Nam vitae accumsan augue, nec sagittis orci. Nam posuere, leo quis ullamcorper mattis, augue ipsum elementum ipsum, id vehicula eros erat a eros. Proin eu commodo magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam vitae posuere erat. Nullam sagittis massa non pellentesque finibus.

// Praesent vel ligula et dolor feugiat dapibus. Donec eget tellus ex. Nulla a ornare justo. Vestibulum euismod varius metus, eget faucibus lacus laoreet eget. Quisque sodales tempus mauris, pharetra varius sapien lacinia eget. Nullam et nibh ac neque pharetra tristique sed vitae est. Curabitur dolor erat, lobortis in augue a, blandit molestie augue. Nulla suscipit malesuada nisl id lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin lacinia mauris vel felis interdum dictum. Donec ac eleifend augue. Donec magna elit, elementum sit amet ante at, lacinia vulputate nunc. Pellentesque eu ex lectus. Donec vitae facilisis lectus, ut facilisis ligula.

// Praesent mauris felis, consectetur quis ligula eu, feugiat bibendum sem. Cras pulvinar id velit sit amet luctus. Donec ac nibh sed mi rhoncus gravida eu vel quam. Donec vel nunc turpis. In hac habitasse platea dictumst. Integer pharetra ligula sit amet imperdiet viverra. In ante odio, scelerisque ut nunc sed, consectetur maximus tellus. Maecenas quis scelerisque velit. Proin egestas, magna ut tristique feugiat, sem sapien fringilla velit, a accumsan neque mi a massa. Donec maximus viverra leo vitae volutpat.

// Duis volutpat malesuada turpis ac aliquam. Suspendisse rutrum ultrices metus et commodo. Proin aliquam, nulla sit amet elementum ultrices, velit velit eleifend metus, sit amet gravida felis tellus nec neque. Quisque blandit eleifend leo, sit amet tincidunt augue. Curabitur aliquet fringilla orci vel accumsan. Maecenas eget quam quis metus blandit consectetur. Nulla posuere, ante id finibus bibendum, dui est dapibus nisl, sed ultricies leo lorem vestibulum lorem. Curabitur ultrices, metus quis lobortis bibendum, lacus magna suscipit sem, non feugiat ex lectus ut arcu. Quisque sit amet orci eu risus facilisis elementum at ac lorem. Cras hendrerit quam ante, id ullamcorper mi venenatis eu. In ac libero feugiat, molestie augue in, ultrices lorem. Aliquam sed varius dolor. Mauris luctus lacus sed accumsan elementum.`;

// let title = "Lorem Ipsum";

// let author;




// //Print story and title
// const storyTitle = document.querySelector("#story-title");
// const storyBody = document.querySelector("#story-body");

// storyTitle.textContent = title;
// storyBody.textContent = story;



// //On button click set author name to user input
// const submitButton = document.querySelector("#add-author");

// submitButton.addEventListener("click", () => {
//   const AuthorName = document.querySelector("#author-name");
//   const userInput = document.querySelector("#user-input");

//   AuthorName.textContent = userInput.value;
// });


