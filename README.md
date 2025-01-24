/Read me doc 
(must be logged in to ADA account to access links in the read me)
(Links to repos are at bottom of the Read me)

The features we decided to add to the basic skeleton that was provided were the User Authentication feature which prompts the user to register and log in upon first arrival on to the platform, and the blog post management feature that allows users to search and fiter blog posts via a dropdown.

Team Contributions

Joint responsibilities 

As a team we had to decide which softwares we wanted to use and how we would collaborate effectivley on this project, 
settling on javascript, express, sql and sequelize for the softwares and finally github codespaces to allow us to work 
together. Using commits and git commands such as git pull and push to manage our workload as effective as possible. 
Additionally the initial planning phase was joint as we settled on the features we wanted to implement and how we should 
approach them, aswell as types of testing we wanted to use whether it be TDD, BDD or both, in the end we settled on both 
as this gave out platform extra assurances by covering different possibilities. It is also worth adding that as we worked 
on this mostly in person the coing although seperated was a joint effort also.
 
Ethan my responsibilties were to add the blog management feature and the relevant tests for this feature. 
in summary this feature allows users (once logged in) to filter for bog posts by date posted and alphabetical order
,aswell as a search bar, something similar to other blog apps seen nowadays. It will let the user know if blogs dont 
match their search and prompt them to search again . This feature was added to give the user more accesibility on the 
app and improve overall UX

Reece my responsibilities were to add the User authentication feature and relevant tests for this feature. In summary this feature enhances both app security and user experience by prompting the user to make and account a login. This will ensure that the users app will be personalised to them and allow them to attach their profile to the posts that they make. Other features are for exmaple when creating a password it must have more than 6 characters. this further enhances the security of the platfrom. bcyrpt was used for the passwords

Setup Instructions

to run the app simply input npm start into the terminal and this will take you to our home page, along the header 
you will see an option to "register". Once clicked on you will be prompted to add a username, email, password and to 
confirm that pasword. The system will remember your login details and input them for you next time you load up the app. From there you can navigate through the app using "create posts" to add you posts and the search functionality to filter through them. You can also view posts made by other users in this instance between myself and Reece and filter through those aswell.
You can filter using the dropdwon or the search bar, allowing you to filter by key words and or date/time posted

Evidence is linked below underneath each subheading directly related to the rubric 

Feature implementation:

Blog Management Feature
screenshot showing the index.js file that manages the database connection and imports models https://drive.google.com/file/d/1ApHOyRoGpbYxRWp8DW8E1L9utl_5tIo8/view?usp=drive_link
screenshot showing the blog.js file that has majority of the code for this feature https://drive.google.com/file/d/1wC75XI3CWgSBIl2rU0732ruMziCZX01D/view?usp=drive_link
screenshotof index.pug that takes care of the front end for this feature https://drive.google.com/file/d/114gA8RXbn4N0vf1UzdQfDoOqigSmC7cB/view?usp=drive_link

User Authentication Feature 

here is a link to a runthrough video that looks at both features https://drive.google.com/file/d/1gNlrHBn_Qp_1_ffRL6iwGS4996puyzh5/view?usp=sharing

Testing 

links to blog management feature BDD/Manual Testing https://drive.google.com/file/d/1LmBDC23uUFXGdhFJ-_SOqgJyaCfYSEal/view?usp=drive_link

aswell as this we manually tested the platform on every stage of the build phase to ensure that there was no bugs or defects and that overall fuctionality of the platform was to an acceptable standard

additionally when running npm start on the repo with full functionality it will run the automated test suite we implemented 

screenshot of test suite https://drive.google.com/file/d/1FPO98Tvez0GEOLqsZMzir-nyxGUv7VUl/view?usp=drive_link

Security Enhancements
error when password is incorrect https://drive.google.com/file/d/1R6UZb5YRBcIaFvfymcqmVDZ5PnabFi3F/view?usp=drive_link
error when user tries to create password with less than 6 characters https://drive.google.com/file/d/1mvQtyoKeilbgNonJm94aX0tEHfBPLbLv/view?usp=drive_link
error showing the user their email isnt registered https://drive.google.com/file/d/1r1s-STaf0qna9LRF3WHlC4NigH91Nbaq/view?usp=drive_link

Code Quality and Refactoring 

Throughout the code you can see that we attempted to make the code as clean and easy to follow as possible, using relevant names where possible and making it easy for anyone looking at it to understand. Aswell as this you can see evidence of refactoring by reading the commits and delving into them to see the changes that were made to improve both code quality and functionality 

Git Practices
link to show commits being used aswell as seperate branches to work on code https://drive.google.com/file/d/1VRxkIHpNntFWA3Wb0S0tp4v5ILiXXLCj/view?usp=drive_link!

link to show some of the pulll requests that were made during the build phase, the allowed us to review eachothers code and make relevant comments/suggestions on the code that the other had made, furthering the collaborating on the assignment  https://drive.google.com/file/d/1UxCi-kvaYLPh6mMnIpSfPvPbaZmi-q2y/view?usp=drive_link

Aswell as this as we were learning about the platform we made use of git commands such as "git push" "git pull" "git checkout
"git merge" etc. this was instumental in making it as seamless as possible when collaborating. 

links to the repositorys 

Blog Assignment Main which has commit history   https://github.com/ethanquinn1/Blog-Assignment-Main

Blog 2 Assignment task which has test suites and functional app  https://github.com/reecewood-97/Blog2AssignmentTask