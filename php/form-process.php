<?php
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];
 
$EmailTo = "contacto@martinkas.com.co";
$Subject = "Nuevo mensaje desde sitio web";
 
// prepare email body text
$Body .= "Nombre: ";
$Body .= $name;
$Body .= "\n";
 
$Body .= "Correo: ";
$Body .= $email;
$Body .= "\n";
 
$Body .= "Mensaje: ";
$Body .= $message;
$Body .= "\n";
 
// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);
 
// redirect to success page
if ($success){
   echo "success";
}else{
    echo "invalid";
}
 
?>