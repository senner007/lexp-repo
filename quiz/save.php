<?php
Header('Cache-Control: no-cache');
$f = fopen('data.txt', 'w');
fwrite( $f, $_POST['message']);
fclose($f);

echo 'Comment has been saved';

?>