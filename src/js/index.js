const documentReady = () => {

    const page = document.getElementById("page");
    const buttonNav = document.getElementById("buttonNav");
    const suscripciones = document.getElementById("suscripciones");
    const contenido = document.querySelector(".main");
    const fragment = document.createDocumentFragment();
    
    
    
    const themeControlator = document.getElementById("themeControlator");
    const localConfig = localStorage.getItem('theme');
    
    
    
    //:::::localStorage:::::://
    if (localConfig === 'dark'){
        page.classList.toggle("page--dark-theme");
    } else if (localConfig === 'light'){
        page.classList.toggle("page--light-theme");
    }
    
    //:::::::NAV:::::://  
    buttonNav.addEventListener("click", () => {
        page.classList.toggle("page--active");
        suscripciones.classList.toggle("suscripciones--desactive");
      });
    
    themeControlator.addEventListener('click', () => {
        let themeColor;
        page.classList.toggle("page--dark-theme");
        if (page.classList.contains('page--dark-theme')){
            themeColor = 'dark';
        }
        else{
            themeColor = 'light';
        }
        localStorage.setItem('theme',themeColor);
    });
    
    
    //::::::::API-REMOTA::::::::://  
      const fetchData = async () => {
        try {
          const apiRemote = await fetch("https://jeanfrancola.github.io/reto6-Youtube/public/json/videos.json");
          const data = await apiRemote.json();
          // console.log(data);
          pintarVideos(data);
        } catch (error) {
          // console.log(Error);
        }
      };
    
      const pintarVideos = (data) => {
        // console.log(data);
        data.forEach((apiRemote) => {
          // const infoVideos = document.createElement('div');
          // infoVideos.classList.add('main__videos-info')
          const cardVideos = document.createElement("div");
          cardVideos.classList.add("main__videos-container");
    
          const linkVideos = document.createElement("a");
          linkVideos.setAttribute("href", apiRemote.searchVideo);
          linkVideos.classList.add("main__videos-link");
    
          const imgVideos = document.createElement("img");
          imgVideos.setAttribute("alt", apiRemote.nameVideo);
          imgVideos.setAttribute("src", apiRemote.imgVideo);
          imgVideos.classList.add("main__videos-image");
    
          const nameVideos = document.createElement("h4");
          nameVideos.textContent = apiRemote.nameVideo;
          nameVideos.classList.add("main__videos-name");
    
          const nameCanal = document.createElement("h5");
          nameCanal.textContent = apiRemote.name;
          nameCanal.classList.add("main__videos-canal");
    
          const logoVideos = document.createElement("img");
          logoVideos.setAttribute("alt", apiRemote.name);
          logoVideos.setAttribute("src", apiRemote.logoCanal);
          logoVideos.classList.add("main__videos-info-logo");
    
                cardVideos.appendChild(imgVideos);
                cardVideos.appendChild(logoVideos);
                cardVideos.appendChild(nameVideos);
                cardVideos.appendChild(nameCanal);
            linkVideos.appendChild(cardVideos);
          fragment.appendChild(linkVideos);
        });
        contenido.appendChild(fragment);
      };
    
      fetchData();
    };
    
    document.addEventListener("DOMContentLoaded", documentReady);
    