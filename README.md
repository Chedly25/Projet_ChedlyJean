<p align="left">
  <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Logo_Mines_Saint-%C3%89tienne.svg/langfr-225px-Logo_Mines_Saint-%C3%89tienne.svg.png/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Logo_Mines_Saint-%C3%89tienne.svg/langfr-225px-Logo_Mines_Saint-%C3%89tienne.svg.png" align="left" width="80" alt="Nest Logo" /></a>
</p>
<p align="left">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" align="right" width="120" alt="Nest Logo" /></a>
</p> <br />
<br />
<br />

## Projet liste et localisation des musées de France

Nous utilisons un jeu de données opendata issu de https://www.data.gouv.fr/fr/datasets/liste-des-musees-de-france/ pour créer une api qui liste tous les musées de France avec les différentes données intéressantes dessus comme son adresse, le lieu (château etc) où il se tient, son url ou encore sa géolocalisation pour le situer sur une google maps dans une application Android.

## Auteurs

- [Chedly Boukhris](https://github.com/Chedly25)
- [Kouassi Jean Raïce Kouakou ](https://github.com/jeanraice)


## Features

À partir du fichier Json listant ces musées, nous créons un objet Typescript sur lequel on fait nos différentes opérations.
Nous avons mis en place 4 opérations différentes : GET : retourne tous les musées, retourne les musées dans une région donnée, retourne un musée suivant son nom ou encore les musées suivant leur date d'appellation,
POST pour créer et ajouter un nouveau musée, PUT pour mettre à jour le musée suivant si on le met en favori ou si on l'enlève et finalement une méthode DELETE pour supprimer un musée de la liste.

## Demo

L'API marche parfaitement. En local, sur le port 8080 ou déployée sur CleverCloud.
Nous pouvons passer maintenant à l'application.
https://github.com/Chedly25/ProjetAndroid



