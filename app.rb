require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require File.join(File.dirname(__FILE__), "/mailers/rsvp_mailer.rb")

#ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')
set :database, {adapter: "sqlite3", database: "foo.sqlite3"}
#ActiveRecord::Base.establish_connection adapter: "sqlite3", database: "foo.sqlite3"

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
		admin = Admin.all
		if session[:admin] != admin[0][:username]
			erb :admin_login
		else
			erb :admin
		end
	end

	post "/admin" do
		admin = Admin.all
		if params[:username] == admin[0][:username] && params[:password] == admin[0][:password]
	 		session[:admin] = params[:username]
		end

	 	redirect "/admin"
	end

	get "/logout" do
		session.clear
		redirect '/admin'
	end


	get "/rsvp" do
		content_type :json
		@rsvp = Rsvp.all
		@rsvp.to_json
	end

	post "/rsvp/new" do
		content_type :json
		@rspv = Rsvp.new(first_name: params[:first_name], 
			last_name: params[:last_name], email: params[:email])

		if @rspv.save
			status 200
			#mailer.send({ email: params[:email] })
			{code: 200, message: "rsvp successfully saved!"}.to_json
		else
			status 404
			{code: 404, message: @rsvp.errors }.to_json
		end
	end
end