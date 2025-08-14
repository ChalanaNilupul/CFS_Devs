
//const main = document.querySelector('.C-back');

function load() {
 
  setTimeout(() => {
    const head = document.querySelector('.head');
    const main = document.getElementById('sign');
    const bars = document.getElementById('bars');
    const con = document.getElementById('conout');
    

    head.style.opacity = 0;
    head.style.display = 'none';
    
    bars.style.display = 'block';
    main.style.display = 'block';
    con.style.display = 'block';
   

    //setTimeout(() => (main.style.opacity = 1), 50);
  }, 3000);
}

load();




/*function color(){
  const loader = document.querySelector('.head');
  loader.style.display='none';
}*/

