# RPS
### Small Rock-Paper-Scissors game

Lauch instructions:
1. Install Ruby 2.5.3 or yonger https://gorails.com/setup/ubuntu/18.04#ruby
2. Install Rails 5.2 https://gorails.com/setup/ubuntu/18.04#rails
3. Clone this repo and `git checkout rock-paper-scissors-game`
4. Install `bundler` and make `bundle install`
5. Create .env file in the project root and add
  ~~~text
    RPS_API_URL=<rps api url goes there>
    RPS_TEST_API_URL =< rps mock api url goes there>
  ~~~
  Replace text in "<>" with valid RPS urls from https://curbrockpaperscissors.docs.apiary.io/
6. Launch `rails s` and open localhost:3000 in your Browser 

To run tests run `rails test` in terminal 

Enjoy!
