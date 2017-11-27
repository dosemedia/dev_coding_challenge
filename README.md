# DOSE Developer Coding Challenge

This is your opportunity to show us what you are capabale of!  We are looking for developers who :
- Write clean, well structured code
- Have attention to detail
- Can solve difficult problems
- Are creative

## The DOSE News Poll

For this coding challenge you're going to create a live news brodcast opinion poll widget.

### Step 1 - Create Firebase App

Your web application should be implemented on Google's [Firebase](https://firebase.google.com/) platform.  Begin by setting up a **free** firebase account and starting an app project.

### Step 2 - Implement Authentication

In your web application, implement a simple login workflow that allows poll authors to [create an account and login/logout](https://firebase.google.com/docs/auth/web/manage-users).  You do not need to include the ability to reset passwords, change passwords, or delete accounts.

### Step 3 - Implement Admin UI

Create a user interface that allows authenticated users to create News Polls.  A poll consists of a question and one or more answers.  An example could be the question "Are puppies or kittens cuter?" along with answers "Kittens", and "Puppies".  Users should be able to see a list of all the questions they have ever created.  Users should be able to update/delete any of their questions/answers.  You may choose either [Realtime Database](https://firebase.google.com/docs/database/) or [Cloud Firestore](https://firebase.google.com/docs/firestore/) to store the data.  For the sake of time, you do not need to ensure that the application is secure (users can edit each other's questions if they know the id).

### Step 4 - Implement Voting Widget

Create a voting widget that allows participants to vote on a given question.  For example, if I embed the following on my news channel's website...

```
<iframe src="https://your-app.firebaseapp.com/#/poll/pollidhere" style="width: 400px; height: 200px;"></iframe>
```

...participants will see the poll and be able to choose their answer.

### Step 5 - Provide Realtime Results

After a participant votes on a poll, they should see the current poll results.  These results should update in realtime as additional responses are submitted.

### Step 6 - Deploy

Once your app is complete, deploy it on [Firebase Hosting](https://firebase.google.com/docs/hosting/deploying).

## Submitting Your Solution

To submit your code challenge:
- Store your solution at your favorite git host (like github or bitbucket).
- Once complete, email ablondeau@dose.com and brenna@dose.com with a link to the repository as well as the Firebase Hosting url for your solution.

## Bonus Points

Here's how to get bonus ponts:
- Include good documentation on how to build and run your app locally.
- Provide tests for your app.
- Use [Vue.js](https://vuejs.org/) and [Bulma](https://bulma.io/) for the UI (those are what we use at Dose).
