<?php 
	
	// checking if the form is submit

		$fullname	= $_POST['name'];
		$email		= $_POST['mail'];
		$subject	= 'Contact Form Mail';
		$message	= $_POST['message'];

		$to	 		  = 'chalnan279@gmail.com';
		$mail_subject = 'Message from Website';
		$email_body   = "Message from Contact Us Page of the Website: <br> <br>";
		$email_body   .= "<b>From:</b>{$email} ({$fullname}) <br> <br>";
		$email_body   .= "<b>Subject:</b> {$subject} <br> <br>";
		$email_body   .= "<b>Message:</b><br>" . nl2br(strip_tags($message));

		$header       = "From: {$email}\r\nContent-Type: text/html;";

		$send_mail_result = mail($to, $mail_subject, $email_body, $header);

		if ( $send_mail_result ) {
			echo "Message Sent.";
		} else {
			echo "Message Not Sent.";
		}
		header("Location:../html/contact.html");
 ?>
