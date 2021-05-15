# * Editeur de texte <img src="logo.ico" style="width:35px;height:auto" />

Ce projet est un editeur de texte faire en python. Ceci est un projet scolaire donnée a l'issu du cours du Geniel Logiciel


## * Modules utilisés 📔 

Afin de parvenir a nos fins, ce micro editeur de texte utilise comme modulues essentiels les suivants:

- [React js](https://reactjs.org/) pour l'interface graphique
- [Eel](https://github.com/ChrisKnott/Eel) afin de pouvoir utiliser toute la puissance des technologies du web et les embarques dans un program en combinant            [python](#) et Technologies du web
-[pyinstaller](https://pypi.org/project/pyinstaller/) afin de creer un executable quand le developement du projet sera terminer

## * Comment fonctionne brievement le code 🤔 ?
Basique l'application est faite en deux parties
- <b>FrontEnd</b>: qui lui est fait en [React](https://reactjs.org/)
- <b>Backend</b>: fait avec python, [eel](#) est utiliser pour creer un server et permet la comminication entre python  et javascript pour le front-end

Eel cree une connection un serveur et une connection websocket et expose les fonctions python dans le frontend
Et aussi les appels de fonctions backend se font de facon asynchrome.


## * Comment executer le logiciel 🤔 ?
  Prerequis pour l'execution du logiciel 
  - Node js
  - Python, eel
  - Une connexion internet pour installer les dependences

### Pour demarrer executer le logiciel simplement executer le logiciel 
<code>
  <pre>
    yarn start 
  </pre>
</code>

### Pour creer un build de distribution 
- D'abord creer le build js avec la commande ci dessous
<code>
  <pre>
    yarn build:js 
  </pre>
</code>

- Ensuite dans le dossier build, ajouter un <b style="font-size:15px">.(point)</b> avant chaque lien vers une ressource exemple :<code><pre> /static/fichier.. -----> ./static/fichier </pre></code>

- Puis creer le build eel(python) qui va fusionner eel et le frontend en faisant ceci:
<code>
  <pre>
    yarn build:eel
  </pre>
</code>

Le build etant fini, l'executable se trouve dans le dossier dist<br>
Profitez 🙋 🔥 !

## * Bugs et suggestions 🚒 
Pour tout bugs ou eventuel suggestion veuillez ouvrir une [issue](#) et pour d'eventuelle suggestion veuillez 
nous ecrire ou nous contacter [@siprogramming](https://github.com/SiProgramming)
