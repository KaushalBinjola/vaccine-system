# Vaccine System

### About the Project 
The vaccine system is an online portal for producers and consumers of vaccine alike. They both can use the same application but recieve different functionalities. The project is made using the MEAN stack.

### Guiding through the Project
The project is made very easy to use and has simple simple ergonomic design which can be used by everyone. 
When you enter the application, you are greeted by a home page. You can't do much here, to extract the complete features of the application, one will need to signup and login if they are first time users, or just login if you are already a user!
Home Page without login :-
<img src = "Readme images/home no login.png">

Once you're in the home page, click on the signup button and you will be redirected to the producer signup page. If you're not a producer, use the redirect text below to proceed to consumer signup page. Once you are signed up, login and you're ready to go! 
The application uses JWT to load sessions for the user. Hence, you will be logged in untill you log out of the application!

<img src = "Readme images/signup producer.png">
<img src = "Readme images/signup consumer.png">

There is a common login for both producers and consumer. The checkbox will signify your designation. 

<img src = "Readme images/login.png">


As the project has 2 parts, I will guide you in two ways. First the producer, then the consumer.

##### Producer
As soon as you login as a producer, the first change you will notice is that now, you have additional buttons on the nav bar. That means there are more things for you to do. 

<img src = "Readme images/producer navbar.png">

Let us first start with the Producer button. 
**Producer**
This button will redirect you to a page, where you, a producer can add, delete and update your vaccine stock. 

<img src = "Readme images/producer vaccines.png">

At the top of the page, below the title, you will see an Add Vaccines button. When clicked on, you will be redirected to a form wherein you will fill the details of the the vaccine you want to add. NOTE: If you try to add vaccines which are already present, the app will stop you. Once you have filled all details. Click ADD and your vaccine will be added, and you will be redirected to your vaccines page. 

<img src = "Readme images/producer add.png">

Your vaccines will be displayed to you as cards, and will have all notable details of the vaccine. When you click on a card, the card will flip and will show you the various you can perform on the vaccine, like update or delete. 
Firstly, when you click on update. The same form as vaccine add will open up, but you will only be able to alter a few fields, like stock and expiry date of the vaccines. 

<img src = "Readme images/producer update.png">

Once updated, the app will redirect you to the vaccines page and the changes will be reflected. 
Next, when you click on delete, the card will be deleted and the change will be reflected at the same time.

The next button on the navbar you will see is City Transfer. 
**City Transfer**
This button will redirect you to a page wherein you, a producer will be able to send vaccines to different cities, all across India. 

<img src = "Readme images/producer city transfer.png">

So, you will need to find the vaccine you want to send to your required city. The details will fill up, add stock and the city you want to send the vaccine to and click add and the vaccine will be transferred. along with that. There will also be a graph below the add button showing the vaccines you have and their stocks. Graphs are easy to read and provide better information on specific things.

Now we are done with all Producer functionalities. We will logout form the nav bar and login as consumer. 

##### Consumer
A consumers navbar is a bit different from the producers. We will see seperate buttons which do entirely different functions.

<img src = "Readme images/consumer navbar.png">

Let us first go to the Consumer Button.
**Consumer**
The app takes your, the consumers city during signup and shows all the vaccines available in your entered city. The vaccines will be displayed as cards. Once you click on the cards, they turn and reveal an add button. On clicking the add button, the details regarding the vaccine will fill up on the form like structure you see at the top, below the title. Add the number of vaccines you want, and we are good to go. 

<img src = "Readme images/consumer shop.png">

You have made your first purchase from the shop. To see your cart and bought vaccines. Click on the button in the navbar called cart. 
**Cart**
When we see our cart, we will be able to see all the vaccines we have bought. On flipping the card we will see an option to delete the vaccines or return some of the vaccines. When we click on the return option, the vaccine details will fill up on the form above, enter the amount you want to return and the reason for return. Then click return and you will instantly be able to see the change being reflected on the card. Click delete button to null all the stocks. 

<img src = "Readme images/consumer return.png">

### Conclusion 
We are finally done with all the functionalities of the project. Additional functionalities like : 
Even when you log out and login later, you will still see your changes from before as everything is stored on the database. All the forms have appropriate validations. Producers cannot access consumers page and vice versa. 
Are also present.   





