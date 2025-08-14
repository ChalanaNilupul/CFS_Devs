function load() {
 
    setTimeout(() => {
      const head = document.querySelector('.head');
      const main = document.getElementById('sign');
      const bars = document.getElementById('bars');
     // const logo = document.getElementById('out');
      const img = document.getElementById('img');
      const p = document.getElementById('paragraph');
      const skill = document.getElementById('skill');
     
      head.style.opacity = 0;
      head.style.display = 'none';
      
      bars.style.display = 'block';
      main.style.display = 'block';
    //  logo.style.display = 'block';
      img.style.display = 'block';
      skill.style.display = 'block';
      p.style.display = 'block';
     
     
     // setTimeout(() => (p.style.display = 'block'), );
    }, 3000);
  }
  
  load();