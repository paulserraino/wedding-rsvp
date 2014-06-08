#Wedding RSPV

wedding rspv site for my bro Jesus Franco

#deploying to heroku
- heroku ps:scale web=1

-  uncomment this: 
      ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')

-  heroku addons:add heroku-postgresql:dev
-  heroku run rake -T
-  heroku run rake db:migrate