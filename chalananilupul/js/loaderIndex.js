function load() {
 
    setTimeout(() => {
      const boy = document.querySelector('#hello');
      
      boy.style.animation = "boyup 2s linear infinite";
     
     // setTimeout(() => (p.style.display = 'block'), );
    }, 7000);
  }
  
  load();