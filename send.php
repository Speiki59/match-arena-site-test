<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'php/PHPMailer.php'; 
require 'php/Exception.php';

$file = 'mailCount.txt';

$current = file_get_contents($file);

$mail = new PHPMailer(true);
 
$mail->CharSet = 'UTF-8';
 
$mail->setLanguage('ru', 'php/language/');
 
$mail->IsHTML(true);
 
$mail->setFrom('booking@match-arena.ru', 'Бронирование');

$mail->addAddress('Football@leather-ball.ru');
 
$mail->Subject = 'Заявка №'.$current;
 
$body = '<h1>Контактная информация:</h1>';

if (trim(!empty($_POST['city']))) {
    $body.= '<h2><strong>Город:</strong> '.$_POST['city'].'</h2>';
}
 
if (trim(!empty($_POST['name']))) {
    $body.= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
 
if (trim(!empty($_POST['surname']))) {
    $body.= '<p><strong>Фамилия:</strong> '.$_POST['surname'].'</p>';
}
 
if (trim(!empty($_POST['phone']))) {
    $body.= '<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}
 
if (trim(!empty($_POST['comment']))) {
    $body.= '<p><strong>Комментарий:</strong> '.$_POST['comment'].'</p>';
}
 
$mail->Body = $body;
 
if($mail->send()) {
    $res = '1';
} else {
    $res = '0';
}
 
$response = ['code' => $res];

$current += 1;

file_put_contents($file, $current);
 
header('Content-type: application/json');
echo json_encode($response);

?>