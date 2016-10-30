# TWEB: Labo 01 - Mining data in GitHub


## Description

This project is part of the TWEB course taught at HEIG-VD by professor Olivier Liechti.

It is a simple web application where the user can provide a GitHub repo and its owner, and see some analysis.

The user can first visit the product landing page published on GitHub Pages where he can find a brief presentation of the project and its functionalities. From here, he can transit to the web app and back to the landing page.

The web app is deployed on heroku and once the user provided a repo and its owner, he can see a pie chart and other graphical representation. The web app uses the GitHub API to get the informations and data needed  for the graphs and analysis.

Two graphs can be found on the web app's first page. The first one is a pie chart that shows the number of commits per contributors. Thus, it can be easily seen which contributor is the most productive. The second one is a bar-chart that displays the number of commits per day in a week. Again, it can be found which day of the week is the most productive one.

Finaly, a third graph can be found on the web app's second page. This bar-chart displays the five most visited repositories on our website. To do so, the repo, its owner and a counter were saved in our data base (MongoDB) for each user request. This counter simply store the number of times a repository was visited. Hence, a search was simply performed on these counters to find the 5 bigger ones and displayed them on the bar-chart.

## Landing page

Our landing page can be found on the following link:
- [https://michaelrohrer.github.io/tweb_github_explorer/](https://michaelrohrer.github.io/tweb_github_explorer/)

## Web application

If you want to skip the landing page, the web app can be reached directly using the following link:
- [https://gentle-coast-96649.herokuapp.com/](https://gentle-coast-96649.herokuapp.com/)

## Technology used

- Heroku
- Angular
- JavaScript
- Node
- GitHub pages
- MongoDB
- Chartjs
- Jekyll
- Bootstrap
- Ui Router
- Npm
- Grunt

## Authors

- Michaël Rohrer
- Thomas Hernandez




