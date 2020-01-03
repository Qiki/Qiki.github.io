let txt = 'Hi! I am Qi, a front end engineer who loves food. Trying to find true calling but never succeed. yet. Only play two games, stardew valley and overcooked'; /* The text */
let speed = 50; 
let i = 0;



window.onload = function typeWriter() {
  console.log('hey')
  if (i < txt.length) {

    let introductionP =  document.getElementsByClassName("introduction").item(0)
    introductionP.innerHTML += txt.charAt(i);


    i++;
    setTimeout(typeWriter, speed);
  }
}

