<?php
	if (isset($_POST["submit"])) {
		$name = $_POST['nombre'];
		$email = $_POST['correo'];
		$message = $_POST['mensaje'];
		$from = 'Sitio web Martinkas'; 
		$to = 'info@martinkas.com'; 
		$subject = 'Mensaje desde el sitio web';
		
		$body = "De: $name\n E-Mail: $email\n Mensaje:\n $message";
 
 
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">¡Gracias! Pronto nos pondremos en contacto.</div>';
	} else {
		$result='<div class="alert alert-danger">Hubo un error al enviar tu mensaje, por favor inténtalo más tarde.</div>';
	}
}
	}
?>