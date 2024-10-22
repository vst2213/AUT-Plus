AUTPlus 

Github URL: https://github.com/vst2213/AUT-Plus 

Branch to be used: Release (https://github.com/vst2213/AUT-Plus/tree/Release)

 
Instructions to operate: 

Release will need to be opened using Visual Studio Code 

Please then open a new terminal and change the directory using: “cd autplus” 

Please then type and install the following packages
(Please be aware that installing these packages may take a while):

“npm install node.js” 

“npm install react” 

“npm install firebase” 

“npm install proxy.js”

“npm install server.js” 

Once these have been installed, please right-click the server.js file (located in the SRC files near the bottom) and select “Open in Integrated Terminal”. 

Once opened, you will need to type in the terminal the following: “node server.js”. It will display “Server running on port xxxx” if it has successfully worked. If this step does not work, the port may be taken, if so please change line number 7 of server.js port from "5000" to "5001" and attempt to run it again.

Once server.js is running, please also do the same for proxy.js. You will need to right-click the proxy.js file (located outside the SRC files at the bottom) and select “Open in Integrated Terminal”. 

Once opened, you will need to type in the terminal the following: “node proxy.js”. It will display “Proxy server running on http://localhost:xxxx” if it has successfully worked. 

At this point you will have two separate terminals, you will need a third terminal to run the actual application. Please create a new terminal either using the “+” button or selecting the “Terminal” button on the top navigation of Visual Studio Code. 

In this third new terminal, please ensure you are in the “autplus” directory not the “AUT-Plus” directory. You can change the directory by typing “cd autplus”. 

Once you are in the appropriate directory, please type “npm start” to run the application.  

This will take a moment to initialize the application. When it has completed this process, it will automatically open a new tab in your browser. You will need to create an account using the “Register” button or alternatively use the account provided below: 

Email: admin@gmail.com 

Password: Admin1 

If you wish to login to the admin page, here is the following login information: 

Username: Admin 

Password: admin 

 
