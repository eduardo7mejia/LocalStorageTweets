/** Variables*/
const listaTweets = document.getElementById('lista-tweets');

//Event Listener
eventListeners();
function eventListeners() {
    //Cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //Borrar tweetsl
    listaTweets.addEventListener('click', borrarTweet);
    //Contenido cargado 
    document.addEventListener('DOMContentLoaded',localStorageListo);
}
//Funciones
//Añadir tweet del formulario
function agregarTweet(e) {
    //Trata de abrir lo que tengamos en el action y la opcion por default es abrir esa acción
    e.preventDefault();
    // console.log("Formulario enviado");
    //Leer el valor que tenga textArea
    const tweet = document.getElementById('tweet').value;
    //Crear boton de eliminar 
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    //Agregar al dom
    li.innerText = tweet;
    //añane el boton de borrrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista 
    listaTweets.appendChild(li);
    console.log(tweet);
    //Añadir tweet local storage
    agregarTweetLocalStorage(tweet);
}
//Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        // alert('Tweet Eliminado');
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        // console.log(e.target.parentElement.innerText);
    }
}
/**Mostrar datos de local storage en la lista */
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // console.log(tweets);
    tweets.forEach(function(tweet){
         //Crear boton de eliminar 
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = "X";


    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    //Agregar al dom
    li.innerText = tweet;
    //añane el boton de borrrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista 
    listaTweets.appendChild(li);
    });

}
//agregar tweet a local storage 
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadimos el nuevo tweet
    tweets.push(tweet);
    //Convertir de String a Arreglo para Local Storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
    // //Agregar a Local Storage
    // localStorage.setItem('tweets', tweet);
}
//Comprobar que haya elementos en el local storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    //Revisamos los valores del local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
//Eliminar tweet de local Storage
function borrarTweetLocalStorage(tweet){
    let tweets , tweetBorrar;
    //Elimina la x del tweet
    tweetBorrar = tweet.substring(0,tweet.length -1); 
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet,index){
        if(tweetBorrar === tweet){
            tweets.splice(index,1);
        }
    });
    // console.log(tweets);
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
//Función para limpiar el textArea
// function limpiar() {
//     document.getElementById("tweet").value="";
// }