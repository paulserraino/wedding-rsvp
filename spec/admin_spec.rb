require 'spec_helper'
require File.join(File.dirname(__FILE__), "../models/admin.rb")
		
describe Admin do
	before { @admin = Admin.new(username: "admin", password: "foobar")}	

	subject { @admin }

	it { should respond_to(:username)}
	it { should respond_to(:password)}
end