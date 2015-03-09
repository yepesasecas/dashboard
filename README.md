#Bongo Dashboard
Use Nodejs to create a simple Real Time Dashboard.
Convert HTTP POST in to a socket event sent to browser.
![Dashboard ScreenShot](/public/landing.png)

##Events Emulator
Run Order emulator
```
node run order_example.js
```

##Server
Run Dashboard Server
```
node run app.js
```

##Mongo DB
You need to run a Mongo DB in order to save events.
```
mongod
``
**Events are only sent to the user after saving to DB**

##Browser
Open Browser and go to
```
http://localhost:3000
```
