require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require File.join(File.dirname(__FILE__), "/mailers/rsvp_mailer.rb")

require 'active_record'

#ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')
#set :database, {adapter: "sqlite3", database: "foo.sqlite3"}

require File.dirname(__FILE__) + '/models/rsvp.rb'

class App < Sinatra::Base
	enable :sessions
	register Sinatra::ActiveRecordExtension
	mailer = RSVPMailer.new

	get "/" do
		erb :enRSVP	
	end

	get "/admin" do
		erb :admin_login
	end

	post "/admin" do
		
	end

end