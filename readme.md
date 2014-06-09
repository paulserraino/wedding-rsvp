#Wedding RSPV

wedding rspv site for my bro Jesus Franco

#deploying to heroku

-  uncomment this: 
      ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')

-  heroku addons:add heroku-postgresql:dev
-  heroku run rake -T
-  heroku run rake db:migrate