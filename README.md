# Repo Strutucture

# Branching Strategy
This project uses the [gitflow](https://github.com/nvie/gitflow) branching model.

- [master](https://github.com/udacity-blitz/4dat/tree/master) is the production branch
- [develop](https://github.com/udacity-blitz/4dat/tree/develop) is the active branch where commits are made

![gitflow](https://cloud.githubusercontent.com/assets/108018/24048940/b28ec3a2-0ae7-11e7-967c-bf0986e95f90.gif)


When you first clone this repository, you'll need to initialize gitflow by running: `git flow init -d` in the project root folder.

Now that your local environment is all setup, you can use the following procedure to contribute to this project.

  1. Run `git flow feature start <feature-name>`
  1. Implement your feature and commit the changes.
  1. Run `git flow feature finish <feature-name>`
  1. Create PR comparing develop branch and feature
  1. Assign PR to reviewer (Shaurav)
  1. Once PR approved, merge

Use the following process to cut a new release.

  1. run `git flow release start <version>`
  1. bump the ios package version. Note that the final release of this MVP phase will be 1.0 so all intermediate releases are 0.XX
  1. run CI and deploy
  1. run `git flow release finish <version>`
  1. run `git push --follow-tags`
  
You'll find a great [tutorial on gitflow here](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/) if you want to learn more about the details of how it works.


## Deployment

TODO: CI

# Resources
Google Cloud Project: 
Auth0 Project:
