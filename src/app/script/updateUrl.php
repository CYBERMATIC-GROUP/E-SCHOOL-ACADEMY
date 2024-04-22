<?php
// Récupérez la nouvelle URL depuis la requête POST
$newUrl = $_POST['newUrl'];
var_dump($newUrl);
// Créez le contenu JavaScript
$jsCode = <<<EOD
environment.apiUrl = '$newUrl';
console.log('Nouvelle URL mise à jour :', environment.apiUrl);
EOD;
// Répondez avec le code JavaScript généré
header('Content-Type: application/javascript');
echo $jsCode;
