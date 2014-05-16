# Node / Angular / MongoDb - Todo App using SSL encryption

The same Node Todo App built in 'CRUD-Todo-MEAN' repository but with OpenSSL encryption added. 
Node/Express provides the RESTful API. 
Angular provides the front end and accesses the API. 
MongoDB stores the data.


## Install OpenSSL


Initially I tried installing [OpenSSL](https://www.openssl.org/) on Windows 7 32bit. The process is shown on [askyb.com](http://www.askyb.com/windows/compiling-and-installing-openssl-for-32-bit-windows/). You are required to install Microsoft Visual Studio and download and install [Active Perl](http://www.activestate.com/activeperl/downloads). I got errors while following the instructions and decided to use my Mac instead.

On a Mac OpenSSL probably is installed already in /usr/bin/openssl Check by entering: <pre>$openssl version</pre>
To see the path: <pre>$which openssl</pre>

You can install the Homebrew OS X package manager using:
<pre>$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)" </pre>

Install Openssl using homebrew:
<pre>$ brew openssl</pre>
Homebrew will install OpenSSL in /usr/local/Cellar/openssl note this is a different directory path than the one apple installed openSSL to. 


This [link](http://javigon.com/2014/04/09/update-openssl-in-osx/) gives a clear guide to upgrading OpenSSL to the latest bug free version using the [Homebrew OS X package manager](http://brew.sh).

A source of information about OpenSSL [madboa.com](http://www.madboa.com/geek/openssl/#intro-version).


# Heartbleed Man-in-the-Middle Attack

It is important to check on the [OpenSSL site](https://www.openssl.org/) that the version of OpenSSL you have installed is not susceptable to this attack. The Heartbleed vulnerability allows theft of the servers private keys and users session cookies and passwords. Which is quite serious. A fixed version of OpenSSL was released on 7th April'14 and this is the version I upgraded to.


## Generating a Self Signed OpenSSL Cert

The objective is to create a private key 'server.key' file and a certificate file 'server.crt'. 

This [Heroku link](https://devcenter.heroku.com/articles/ssl-certificate-self) is where I learned the procedure.

1. Generate RSA private key 2048 bit long modulus
<pre>$ openssl genrsa -des3 -out server.pass.key 2048 </pre>
Enter pass phrase for server.pass.key: password
Verify - Enter pass phrase for server.pass.key: password

File server.pass.key has now been created

2. The private key needs to be stripped of its password so it can be loaded without manually entering the password.
$ openssl rsa -in server.pass.key -out server.key
Enter pass phrase for server.pass.key: password
writing RSA key
You now have a server.key private key file in your current working directory.

3.Generate Certificate Signing Request (CSR) using the private key.
Also required when purchasing a SSL cert. Required to enter info about yourself/company and your domain.

$ openssl req -nodes -new -key server.key -out server.csr

- Country Name(2 letter code) [AU]: IE
- State or Province Name:Leinster
- City: 
- Organisation Name:
- Organisation Unit Name:
- Common Name (e.g. server FQDN or Your name): localhost
- Email Address:


Please enter the following extra attributes to be set with your certificate request
A Challenge Password:
An optional company name:

4. Generate SSL Certificate (valid for 365 days)
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
Signature ok
subject=/details I gave..
Getting private key
Now have the certificate file: server.crt


# Requirements

* [Node and npm](http://nodejs.org)
* [Bower](http://bower.io/) to install client side packages
* MongoDB running 


## Installation

* Clone the Repository
* npm install - install all the node packages listed in the package.json file 
* bower install - installs the front end packages listed in the bower.json file
* Turn on MongoDB
* Open ../server/config/database.js and enter Mongo database details
* node server.js - start up Node\Express server
* Browse to https://localhost:3085
* Acccept the warnings - nothing too bad will happen I promise!!



## Trust our Self Signed SSL Certificate

Because our certificates are free and not issued by a Certificate Authority each time a browser tries to access our SSL secured server a warning message appears saying that the cert is not trusted. We can stop this warning message appearing on our computers by adding our cert to the trusted certs store on the computer.


# Windows 7 - Add cert to Trusted Certs List


Add the SSL certificate to trusted certificates list in Windows 7.
Open the Microsoft Management Console.

<pre>run mmc</pre>

Follow the following steps
1. File-Add/remove Snap-in, Certificates, Computer Account 
2. Local Computer, Finish Button
3. Go to Root Console Window
4. Certificates(Local Computer) & select Trusted Root Certificate Authority
5. Right Click over Certificates, All Tasks, Import and select 'server.crt' file

<img width="80%" src="screen-shots/mmc-1.jpg" "image 1"></img>
<img width="80%" src="screen-shots/mmc-2.jpg" "image 2"></img>
<img width="80%" src="screen-shots/mmc-3.jpg" "image 3"></img>
<img width="80%" src="screen-shots/mmc-4.jpg" "image 4"></img>
<img width="80%" src="screen-shots/mmc-5.jpg" "image 5"></img>
 
