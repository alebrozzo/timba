# My trip to learning some deployment tools

## The application used for learning

You know how when you want to play a board game, you set everything up only to find out that you lost one of the three dice it needs? Or you want to play Dungeons and Dragons but you can't find your 20 faced die? Heck, the kids broke the spinning wheel of Game of Life, should you throw the whole game to the trash? Fear not, I've got you covered.

### Enter Timba

Timba is a web application that lets you create a set of virtual dice with as many dies and with as many faces as you need. You want a single 6 faces die for your board game? easy pease. Oh you need two of those? No problem, edit the die count or just create a new set. You remembered a game you knew when you were little where you needed 5 dies? same thing. A full blown D&D set? just define as many die types with as many faces as you need. Game of
Life wheel broke? New 10 faces die and you are all set. Also, what is a coin if not a 2 faced die?

Creating the dice set is the first step, you can then, of course, roll the dice. Timba will keep track of all the rolls of each die so you can go back and revisit the results. When you are done or want to start over you just reset the rolls.

This was the initial scope of the application, no Auth, no long term saving of the data, nothing fancy.

## Tech stack (initial)

- Svelte

  I wanted to take the chance to learn a bit about Svelte, since I see it getting more and more steam on the web. So instead of using good ol' React or just plain JS I went with that.

- Firestore

  As a way to store dice sets I initially used LocalStorage and that worked well, but there is no deploy needed if I just want to use the app in my own computer. I also never had used Firestore nor Supabase so I went ahead and implemented them both. The main difference between them is that Supabase offers a PostgreSQL database while Firestore gives you a NoSQL database. I felt Supabase's client was not good enough for an actual application (lack of transactions being a big negative point) but also for Timba's needs a NoSQL database was a better fit. This and the fact that I have a vast experience in SQL and very little in NoSQL made me decant for Firestore. The more I could learn in one go, the better (not true but it sounds nice).

## Deployment learnings

Once the app reached a point where it made sense to deploy - mainly being able to CRUD dice sets and roll them - I started looking for deployment options. Now here is the thing: I wasn't sure my application was static or dynamic. I've always found these terms vague... simple on the surface but confusing in the edge cases.

Timba has a database, although for now it is the same data for every user. But the database is online, I wouldn't hit an API of my own to get the data, I would just use the Firebase client to get it. So is it static or dynamic? I don't know.

Besides that, Svelte can do SSR automatically (and it was doing so), that hinted me to call it dynamic... or, if the pages could be all pre-rendered, would it then be static? I mean, if the build step would visit all the links (the database is queried only once at the load of the application) it could probably generate all the pages. Do build steps do that? do they execute client or API calls? could Timba be pre-rendered? I don't know.

### First attempt: Google Cloud Platform

Since I had opted for using Firestore as Timba's database, and Firestore is a product of GCP, I decided to give this platform a first try. I went to the site and took a look around. The platform's design was nice but I couldn't understand a word of what I was reading. And since you don't know what you don't know, I quickly gave up this approach of going into a cloud provider and looking around.

### Second attempt: AWS (Amplify)

I googled for information on hosting, asked a few people, and in the end somehow I ended up with I should either use AWS S3 or EC2. How is a newbie supposed to really know what to look for with those names? Anyway, apparently static sites would use S3 and dynamic sites would use EC2. Please refer to my previous rant regarding what even static and dynamic mean.
In my mind, right or wrong, I have the idea that I just want to put the result of building the web app that requires no own API in a service that just exposes said files. I was hoping any of these cloud providers would have a service that would do just that. Almost like a good old FTP, drop your files here. It seems that is not cool anymore.

Anyway searching for more info on which of those (S3 or EC2) I should use, something called Amplify showed up. It allows you to deploy straight from your github (or any other git provider). I gave it a try: selected my github project, tweaked the base directory, and hit deploy. It didn't work. I mean, it said it deployed, but the url showed me nothing. Stack overflow had fixes for when the page was blank, which was not my case. So I tried trying to figure out stuff... it did seem like I would need to use something called `adapter-static` for my site to work, and I had decided I would try to treat Timba as a static site until proven otherwise. So I made that change knowing that would not fix my problem, and guess what... I was right, it didn't fix it. Not only that, I was not able to see what the impact of my change was. So I started thinking harder about what could be wrong. I realized that my output folder (`sveltekit/output) didn't have an index file (this I have to thank those adapter-static posts explaining how to use it) and after a couple of hours trying to figure out why, it hit me. Remember at the beginning of this paragraph when I said that I had selected my github project and tweaked the base directory? well, I shouldn't have done that second step. The original base directory setting was correct. So I changed the value to the original one and was ready to hit deploy again to try it out... except there was no "deploy with new settings" button. I read online that people were complaining that they needed to do a bogus change (not even an empty commit) for the deploy to re-trigger. I didn't want to do that just yet, so navigating a pretty but confusing UI I found a "Redeploy this version" button. I clicked it and after redeploying, contrary to my expectations, it did take the new settings into account. Not only that but also I could see my site. It was not working, but it was definitely my site, I recognized the "roulette mat green" color I had picked for a background.

So I then went back to my site generation. My gut feeling (and i have a big gut so the feeling was big too) was that since Svelte does SSR automatically and I was in fact querying the firestore db on a ".server.ts" page, I should try changing that. So I indicated no ssr and removed the ".server" part of my layout file, updated the types (as I am using typescript) and deployed again. Sure enough, Timba was ready in all its splendor and casino colors. I really should change all the UI styles, but I am very bad at design so I probably won't.

### Third attempt: Azure (App Services)

Being all built up and proud of my success I decided to try my luck with Azure next. I had used App Services before and while I didn't really understand what I was doing then, I was only scratching the surface of an existing deploy. I can't remember what I was doing anyway, but I do remember being confused. I didn't remember a feeling of "this is hard", it was more of "I don't know what all these words are supposed to mean".

So there I went, created a new account with my free $200 credit for a month, and headed to App Services. Creating that account ended up being the hardest part of the task. In a similar manner to what I had done with AWS Amplify, I just clicked on Create new static site, pointed to my github account, and clicked "create". After a few seconds I got the url of my app (it doesn't say Timba anywhere) and navigating to it just opened a working application. Was this easier than Amplify? probably not, it's just that when I deployed using Amplify I needed to learn what I was doing and change my app to actually support being served as static.

## Next steps

So this has been the first "I am learning how to deploy to the cloud" step. I want Timba to have many more features, for starters some sort of user creation to allow for each user to have their own private sets. I have the feeling that if I can use firestore's auth abilities I would still be able to get away with a static site, but eventually I will need to make it all dynamic. Even if not necessary, I want to learn different alternatives of application deployment, Timba is just an excuse, or rather, a carrot for this donkey.
