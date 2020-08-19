A quick Proof-of-Concept app which will work as below

- I have a .csv file containing some people names who are part of my known circle, but the relationships to them is un-assigned at first.
- So I upload that .csv file to the app, the app parses it and renders a table with each of those names
- Then the user selects each name and a modal pops-open
- Now the user selects the relationship to those people and submits.
- And that particular relation gets saved to another table as Known Relationship

### MOST Important step is to upload a .csv file as the very first step

- 1. From [http://localhost:3000/](http://localhost:3000/) you first need to upload the .csv file named "UnidentifiedFamilyData.csv" which I kept at dirctory `/client` by clicking on the first circle named 'Contact File'
- 2. Then click on the button 'Click to Assign Family Circle' which will take you to the next route /familycircle
- 3. Here there will be two tables one for the Unidentified and one for the Family Members
- 4. Click on each item of the unidentified list a modal will open where you can assign the Family member and click on Save.
- 5. Then that item will be moved to the table named 'Family Members' and deleted from the 'Unidentified' table
- 6. From this .csv file some data will be uploaded and saved in MongoDB as the very first step.
- 7. My backend is running in Express
-

To launch this project in the local machine.

First create a .env file in `./server` directory with the following details.

```js
MONGO_DB=mongodb://localhost:27017/family-relationship

NODE_ENV=development

```

Then - run `npm install` in both the `./server` and `./client` directories separately, to install all the npm packages for server and client respectively.

Then, start mongodb service with `sudo service mongod start` and then finally run the following command

- `npm run dev`

Which will start both the client (port 3000) and server (port 5000) and launch the site in port 3000. Then navigate to one of the below.

Then navigate to the public or the private (only for logged-in user) site

The site is running at - [http://localhost:3000/](http://localhost:3000/)
