
During the past few weeks, I was implementing the undo/redo function for our graph component interaction. I know this doesn’t sound really clear to you what is that mean. Don’t be panic and keep reading.

![undo-redo](https://user-images.githubusercontent.com/2540791/72689275-c9708780-3add-11ea-9219-7ca14840e92f.gif)
 

As you can see from the animation, user can drag and drop a block and connect to another block. In this animation, when user drag the second block,and click the keyboard shortcut - command + z, the block was removed. When user click comand + shift + z, block was added back. This is the basically feature I was implementing, undo/redo action.

I like start think as simple as possible when I implement something. 
First thing pop up in mind, I could use an array to track all related user interactions. Second, when user trigger a undo action, i can just pop the last item in the array. BUT this doesn't sound correct. What about the redo? I totally forgot it.

Let me try it again.

Still first, I could use an array to track all related user interactions. Each new user interaction will add into the array. Let's still use the case in the animation

<img width="447" alt="Screen Shot 2020-01-19 at 5 37 17 PM" src="https://user-images.githubusercontent.com/2540791/72689723-73521300-3ae2-11ea-9dac-aa8678da45c5.png">



Second, I will have a pointer to point the correct item in the array when undo/redo happens. This way we can easily track where are we during the undo/redo actions.

At beginning, the pointer is -1, every time when user has a new action, we will set the pointer to point the last item in the history action array.

```javascript
const userActions = [];
let pointer = -1;

function addBlock() {
  // add block
  addActionInHistory('add block');
}


function addConnection() {
  addActionInHistory('add connection');
}

function addActionInHistory(actionType:string) {
  // Attention: this is not finall solution.
  userActions.push(actionType);
  pointer = userActions.length -1 ;
}

// final array will look like

['add block','add connection', 'add block']

```

command + z is triggered. We get the action base on the pointer index, we reverse the action, set the pointer = pointer - 1. 

Simiar logic for redo, when user trigger command + shift + z, if the pointer equal to last item in the action history array, there is nothing to redo. If not, first we will make pointer = pointer + 1, then we get the action from the action history array

```javascript

function undo() {
  if (!userActions.length) {
    return;
  }


  const currentAction = userActions[pointer];
  pointer--;
  
  // then we base the current action to do the reverse action
}


function redo() {
  if (!usderActions.length || pointer === userActions.length - 1) {
    return;
  }

  pointer++;  
  const currentAction = userActions[pointer];

  // base on the current action to redo the action

}

```

There is one thing we want to pay attention to -  what if when user is undo couple of the actions, then user add a new block/ a new action. what is going to happen? 

Let's take a look base on our previous example. user add block -> add connection -> add another block, then user click command + z, the second block disppeared, then user add a new connection. 

What's going happen in our action history array.

The pointer currently is pointing to add connection, anything after add connection should be removed and add the new action. So in our add history action function, we should do this

```javascript
function addActionInHistory(actionType:string) {
  let newActionHistory = [];

  if (userActions.length) {
    newActionHistory = userActions.slid(0, pointer + 1);
    newActionHistory.push(actionType);
  } else {
    newActionHistory = [actionType]
  }

  pointer = newActionHistory.length -1 ;
  userAction = newActionHistory
}

```

Here is the pointer changes through most of possible situations

<img width="856" alt="Screen Shot 2020-01-19 at 7 40 09 PM" src="https://user-images.githubusercontent.com/2540791/72691477-b8cb0c00-3af3-11ea-9c39-7ed7ff128ada.png">



Alright, when we are here - hope we already have good sense of how to implement an undo/redo feature.

At very last, since I was implementing this feature in angular during the work. there is one thing I would like to share here for future reference, which I always forget how to do.

How to listen the key event in angular 2+


```javascript
@HostListener('keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    event.preventDefault();
    if (event.keyCode === 90 && event.metaKey && event.shiftKey) {
      // command and z and shift, redo 
    }

    if (event.keyCode === 90 && event.metaKey && !event.shiftKey) {
      // command and z, undo
    }
  }
```

Good night. Happy Sunday;


