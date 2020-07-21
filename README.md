# DOSE Developer Coding Challenge

This is your opportunity to show us what you are capabale of!  We are looking for developers who :
- Write clean, well structured code
- Have attention to detail
- Use creativity to solve difficult problems
- Can help others understand complex data

## Part 1 - Data Collection

Create a single page web application that allows users to submit reviews for their Alexa device.

Your web application should be implemented on Google's [Firebase](https://firebase.google.com/) platform.  Begin by setting up a **free** firebase account and starting an app project.

Then, use [Vue.js](https://vuejs.org/) to implement a simple product review widget that collects the following review information:

* Rating : 1-5 (required)
* Device Variation : Charcoal Fabric, Sandstone Fabric, Black, White, Walnut Finish, Heather Gray Fabric, Oak Finish (required)
* Review : Multi-line text field for the review (required, limit 500 characters)
* Timestamp : [Server Timestamp](https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp) 

The form should have a professional look and feel and perform validation.  We use the [Buefy framework for Vue](https://buefy.org/) in many of our projects.

Form submissions should be stored in the firestore database.

Below the form, the 3 most recent review submissions should be displayed.  This list should use firestore's realtime updates to automatically update whenever a new review is submitted.

You must deploy your solution with [firebase hosting](https://firebase.google.com/docs/hosting/deploying) so that it is available on a public url (you do not need to setup a custom domain).

## Part 2 - Data Analysis

Use Kaggle (or your favorite shareable Jupyter Notebook Service) to create a notebook that:

Loads this Amazon Alexa review dataset : https://www.kaggle.com/sid321axn/amazon-alexa-reviews

Helps non-technical members of the team gain some insights from the data.  Some examples are:
- Plot a histogram of the ratings.
- Is there a variation that receives a disporportionate amount of low/high ratings?
- Is there a specific word that appears frequently in 5 star (or 1 star) ratings?

## Questions?

Please email ablondeau@dose.com with any questions/clarifications on this exercise.

## Submission

To submit your code challenge:
Store your solution for Part 1 at your favorite git host (like github or bitbucket).
Email ablondeau@dose.com with the following:

* Url to your repository for Part 1 (you can also branch from this repository and create a pull request - send the PR url instead)
* Url to your working app for Part 1
* Information to access your solution for Part 2
