require 'rubygems'
require 'bundler'
Bundler.setup(:default, :test)
require 'sinatra'
require 'rspec'
require 'rack/test'
require 'database_cleaner'

# set test environment
Sinatra::Base.set :environment, :test
Sinatra::Base.set :run, false
Sinatra::Base.set :raise_errors, true
Sinatra::Base.set :logging, false

require File.join(File.dirname(__FILE__), '../app')

ActiveRecord::Base.establish_connection adapter: "sqlite3", database: "foo.sqlite3"

RSpec.configure do |config|

	config.before(:suite) do
		DatabaseCleaner.strategy = :transaction
    	DatabaseCleaner.clean_with(:truncation)
	end

	config.around(:each) do |example|
		DatabaseCleaner.cleaning do
		example.run
		end
	end

  #config.color_enabled = true
end