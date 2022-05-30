
#SureDrive.com

![Website Logo](http://i.imgur.com/MBsEn6H.png "Sure-Drive")

```
Logo :D
```



An ecommerce website for car hiring. This is an educational project coded to present what we **learned** from the ASP.NET course of [Globsyn Training School](http://www.globsynskills.com/gfs/)

Used [Bootstrap](http://getbootstrap.com/) to make the website fully responsive.

Website is not live, *yet*.

---

##If You Want To Get Your Hands Dirty! ##

You are more than welcome to **contribute** to this project.

 1. `Fork` the project
 2. `Clone` the project into your local machine
 3. Create a `branch` with name as `<username-topic-branch>`
 4. Add some code
 5. Send `Pull Request` with proper description. We might approve it.
 6. 
 7. Above line was left deliberately `;)`
 8.  ***Happy Coding!***


## Get Going ##
### Things to do to run without error *maybe*

After you have <strike>cloned the project</strike> downloaded the project. Open `CarRentalServices.sln` with Visual Studio. Minimum **.Net Framework required is 4.0**.

 -  Create a database with name like `MyAwesome_DB` and place it under your `App-Data` folder. 
 - Add the connections string into the `web.config file`.
 Right now the `web.config`'s connection string looks like
 
 ```XML
 <connectionStrings>
      <add name="DBConnectionString" 
        connectionString="Data Source=(LocalDB)\v11.0;AttachDbFilename=|DataDirectory|\CarRentalServiceDB.mdf;Integrated Security=True"/>
 </connectionStrings>
  ```
  If you added a new database named as `MyAwesome_DB` then change the connection string as
   ```XML
 <connectionStrings>
      <add name="DBConnectionString" 
        connectionString="Data Source=(LocalDB)\v11.0;AttachDbFilename=|DataDirectory|\MyAwesome_DB.mdf;Integrated Security=True"/>
 </connectionStrings>
  ```
  
 - Create three tables `tblbooking`,`ti8blcars` & `tblusers` as mentioned in [here](https://github.com/tintinmj/Sure-Drive/blob/master/SQLQuery.sql).
 - Create a new folder `Secret` at the root. Create a new file `Email.txt` and write your email address and password with comma separated values.

 ![enter image description here](http://i.imgur.com/yOmDvJH.png "Folder Structure")

 
 ``` 
 Secret/Email.txt
 
 youremailaddress@gmail.com,yourgmailaddresspasswrod
```
    
   Right now only gmail account is accepted to send email. **If you have any generic code to send email in C#, send a pull request with the code**. 

 - The admin username is `admin@admin.com` and password is `password`. Change the username and password in the [`AdminLogin.aspx.cs`](https://github.com/tintinmj/Sure-Drive/blob/master/AdminLogin.aspx.cs)
 ```cs
  if(txtEmail.Text == "admin@admin.com" && txtPass.Text == "password")
  ```

---
## Code Structure ##

Some points to keep in mind

 1. All the user webpage uses [`CarRentalMaster.master`](https://github.com/tintinmj/Sure-Drive/blob/master/CarRentalMaster.master) layout.
 2. All the admin webpage uses [`AdminMaster.master`](https://github.com/tintinmj/Sure-Drive/blob/master/AdminMaster.master) layout.


----------
## Page Flow ##

#### User POV

##### Home.aspx
![enter image description here](http://i.imgur.com/UlOBXsZ.jpg "home.aspx")

##### UserSearch.aspx
![enter image description here](http://i.imgur.com/8GO0GEL.png "UserSearch.aspx")

##### ShowCarsToChoose.aspx
![enter image description here](http://i.imgur.com/rqecykq.png "ShowCarsToChoose.aspx")

##### BookedCarDetails.aspx
![enter image description here](http://i.imgur.com/Fy0CU68.png "BookedCarDetails.aspx")

##### BookedSuccessful.aspx
![enter image description here](http://i.imgur.com/83P6GKA.png "BookedSuccessful.aspx")

##### AboutUs.aspx
![enter image description here](http://i.imgur.com/2iQpHNH.png "AboutUs.aspx")

##### ContactUs.aspx
![enter image description here](http://i.imgur.com/0Y73H4w.png "ContactUs.aspx")

##### ChangePassword.aspx
![enter image description here](http://i.imgur.com/RJ2abjL.png "ChangePassword.aspx")

#### Admin POV

##### AdminAddCar.aspx
![enter image description here](http://i.imgur.com/38xMSDr.png)

##### GridView.aspx (car database view)
![enter image description here](http://i.imgur.com/7mkw3cv.png)

##### AdminGridViewBooking.aspx (booking database view)
![enter image description here](http://i.imgur.com/sPUPb6d.png)


----------
## Technology Used

 1. ASP.NET with C# codebehind
 2. HTML5
 3. [Bootstrap spacelab theme](http://bootswatch.com/spacelab/)
 4. [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
 5. [Nivo Slider](http://nivo.dev7studios.com)


----------
## TODO
- [ ] Add online-cash payment plugin, most preferebly add PayPal sandbox
- [ ] Competely turn the project into MVC
- [ ] Add a sms notfication sender
- [ ] Create a table for driver

----------

## Recognition
- The project team was nominated for "The Dream Team Award".

---
For bugs and hugs contact anirban.nag9038541773[@]gmail[dot]com
