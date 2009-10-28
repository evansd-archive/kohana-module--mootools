<?php
/**
 *
 * The MIT License
 *
 * Copyright (c) 2008-2009 David Evans
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
**/

PHP_SAPI === 'cli' or die('Please run from the command line');

$versions = array
(
	'core' => '1.2.4',
	'more' => '1.2.4.2'
);

$output_folder = realpath(dirname(__FILE__).'/javascript/');

echo "Saving in: $output_folder\n";

$core = array();

foreach($versions as $type => $version)
{
	$mootools = "http://github.com/mootools/mootools-$type/tree/$version/Source";

	echo "From: $mootools\n";

	$json = file_get_contents($mootools.'/scripts.json?raw=true');
	$json = json_decode($json, true);
	
	$file_list = array();

	foreach($json as $folder => $files)
	{
		foreach($files as $file => $details)
		{
			echo "Downloading $file\n";
			$script = file_get_contents("$mootools/$folder/$file.js?raw=true");
			
			$file_list[] = $file;
			
			$deps = array_combine($details['deps'], $details['deps']);
			
			// If a filesays it depends on itself (e.g., Core.js) we ignore it
			if (isset($deps[$file])) unset($deps[$file]);
			
			$deps = preg_replace('/^.*$/', '//= require "$0"', $deps);

			$script = join("\n", $deps)."\n\n".$script;

			file_put_contents($output_folder.DIRECTORY_SEPARATOR.'mootools'.DIRECTORY_SEPARATOR.$file.'.js', $script);
		}
	}
	
	$file_list = preg_replace('/^.*$/', '//= require "mootools/$0"', $file_list);
	$file_list = join("\n", $file_list);
	file_put_contents($output_folder.DIRECTORY_SEPARATOR."mootools-$type.js", $file_list);
	
	// Download the license file
	if ($type == 'core')
	{
		echo "Downloading License\n";
		$license = file_get_contents($mootools.'/license.txt?raw=true');
		file_put_contents($output_folder.DIRECTORY_SEPARATOR.'license.txt', $license);
	}
}
