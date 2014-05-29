<?php


//fwrite($h, $_POST['message']);




$xml = file_get_contents("../quiz/quiz.xml");
$xml = str_replace("</quizes>", $_POST['message'], $xml);
$h = fopen("../quiz/quiz.xml", "w"); 
fwrite($h, $xml);
fclose($h);

?>