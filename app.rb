require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require File.join(File.dirname(__FILE__), "/mailers/rsvp_mailer.rb")

require 'active_record'

#ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')
#set :database, {adapter: "sqlite3", database: "foo.sqlite3"}

require File.join(File.dirname(__FILE__), '/models/admin.rb')
require File.join(File.dirname(__FILE__), '/models/rsvp.rb')

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

	get "/rsvp" do
		content_type :json
		@rspv = RSPV.all

		status 200
		@rsvp.to_json
	end

	post "/rsvp/new" do
		content_type :json
		@rspv = RSPV.new(first_name: params[:first_name], 
			last_name: params[:last_name], email: params[:email])

		if @rspv.save
			status 200
			{code: 200, message: "rsvp successfully saved!"}.to_json
		else
			status 404
			{code: 404, message: @rsvp.errors }.to_json
		end
	end

end