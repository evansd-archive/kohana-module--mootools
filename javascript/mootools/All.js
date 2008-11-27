<?php
/*
	Includes the entire Mootools library.
	Intended for development purposes.
	Do NOT get lazy and use it in production!
*/
foreach(glob(dirname(__FILE__).DIRECTORY_SEPARATOR.'*.js') as $file)
{
	if ($file != __FILE__) require_once($file);
}