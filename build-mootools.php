#!/usr/bin/php
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

// Require myself a YAML parser
require dirname(__FILE__).'/vendor/spyc/spyc.php';

$output_dir = dirname(__FILE__).'/javascript/';
$mootools_dir = dirname(__FILE__).'/vendor/mootools-';

$types = array('core', 'more');
$provided_by = array();
$files = array();

foreach($types as $type)
{
	$package = file_get_contents($mootools_dir.$type.'/package.yml');
	$package = Spyc::YAMLLoadString($package);
	
	$files[$type] = array();

	foreach($package['sources'] as $file)
	{
		echo "Examining $file\n";
		$contents = file_get_contents($mootools_dir.$type.'/'.$file);
		
		// Extract and parse the YAML header
		preg_match('/^---$(.*)^\.\.\.$/ms', $contents, $matches);
		$info = Spyc::YAMLLoadString($matches[1]);
		
		if ( ! empty($info['provides']))
		{
			foreach((array) $info['provides'] as $provides)
			{
				$provided_by[$provides] = $info['name'];
			}
		}
		
		$files[$type][$file] = $info;
	}
}

foreach($types as $type)
{
	foreach($files[$type] as $file => $info)
	{
		echo "Creating {$info['name']}\n";
		$headers = array();
		
		if ( ! empty($info['requires']))
		{
			foreach((array) $info['requires'] as $req)
			{
				$req = pathinfo($req, PATHINFO_BASENAME);
				$headers[] = '//= require "'.$provided_by[$req].'"';
			}
		}
		
		$contents = file_get_contents($mootools_dir.$type.'/'.$file);
		$contents = trim(join("\n", $headers)."\n".$contents);
		file_put_contents($output_dir.'mootools/'.$info['name'].'.js', $contents);
	}
}

echo "Creating symlink from DomReady.js to DOMReady.js for backwards compatibility\n";
symlink($output_dir.'mootools/DOMReady.js', $output_dir.'mootools/DomReady.js');

echo "Creating mootools-core.js, which includes all of Mootools Core\n";
$headers = array();
foreach($files['core'] as $file => $info)
{
	$headers[] = '//= require "'.$info['name'].'"';
}
file_put_contents($output_dir."mootools-core.js", join("\n", $headers));

// Copy in the license file
echo "Copying in license file\n";
copy($mootools_dir.'core/Source/license.txt', $output_dir.'license.txt');
