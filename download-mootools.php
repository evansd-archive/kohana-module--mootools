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
	'core' => '1.2.2',
	'more' => '1.2.2.1'
);

$output_folder = realpath(dirname(__FILE__).'/javascript/mootools/');

echo "Saving in: $output_folder\n";

$core = array();

foreach($versions as $type => $version)
{
	$mootools = "http://github.com/mootools/mootools-$type/tree/$version/Source";

	echo "From: $mootools\n";

	$json = file_get_contents($mootools.'/scripts.json?raw=true');
	$json = json_decode($json, true);

	foreach($json as $folder => $files)
	{
		foreach($files as $file => $details)
		{
			echo "Downloading $file\n";
			$script = file_get_contents("$mootools/$folder/$file.js?raw=true");

			 // Build up a list of core files
			if($type == 'core')
			{
				$core[] = $file;

			}
			elseif($type == 'more' AND in_array('None', $details['deps']))
			{
				// when files in 'more' say they have no dependencies this means that they officially depend on everything in core
				// clearly they don't however, so hopefully the devs will provide us with an actual dependencies list at some point
				$details['deps'] = array_unique(array_merge($details['deps'], $core));
			}

			$php = '';

			foreach($details['deps'] as $dependency)
			{
				if($dependency == $file OR $dependency == 'None') continue; // Core.js has itself as a dependency, for some reason
				$php .= "\t\$this->requires('mootools/$dependency.js');\n";

			}

			if($php)
			{
				$php =
					"/* <?php echo '*','/';\n\n".
					$php.
					"\necho '/*';?> */\n\n";

				$script = $php.$script;
			}

			file_put_contents($output_folder.DIRECTORY_SEPARATOR.$file.'.js', $script);
		}
	}

	// Download the license file
	if ($type == 'core')
	{
		echo "Downloading License\n";
		$license = file_get_contents($mootools.'/license.txt?raw=true');
		file_put_contents($output_folder.DIRECTORY_SEPARATOR.'license.txt', $license);
	}
}


file_put_contents($output_folder.DIRECTORY_SEPARATOR.'All.js',
'<?php
/*
	Includes the entire Mootools library.
	Intended for development purposes.
	Do NOT get lazy and use it in production!
*/
foreach(glob(dirname(__FILE__).DIRECTORY_SEPARATOR.\'*.js\') as $file)
{
	if ($file != __FILE__) require_once($file);
}');