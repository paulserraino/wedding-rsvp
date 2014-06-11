require 'spec_helper'
require File.join(File.dirname(__FILE__), "../models/rsvp.rb")

describe Rsvp do
	before { @rsvp = Rsvp.new(first_name: "paul", last_name: "joe", email: "paul@test.com")}	

	subject { @rsvp }

	it { should respond_to(:first_name) }
	it { should respond_to(:last_name) }
	it { should respond_to(:email) }
	it { should respond_to(:reservation) }
	it { should respond_to(:created_at) }
	it { should respond_to(:updated_at) }

	describe "when first name is blank" do
		before { @rsvp.first_name = " "}
		it { should_not be_valid }
	end

	describe "when last name is blank" do
		before { @rsvp.last_name = " "}
		it { should_not be_valid }
	end

	describe "when email is blank" do
		before { @rsvp.email = " " }
		it { should_not be_valid }
	end

	describe "when email is already taken" do
		before do
			user_with_same_email = @rsvp.dup
			user_with_same_email.email = @rsvp.email.upcase
	    	user_with_same_email.save
		end

		it { should_not be_valid }
	end

	describe "when email format is invalid" do
	    it "should be invalid" do
	      addresses = %w[user@foo,com user_at_foo.org example.user@foo.
	                     foo@bar_baz.com foo@bar+baz.com]
	      addresses.each do |invalid_address|
	        @rsvp.email = invalid_address
	        expect(@rsvp).not_to be_valid
	      end
	    end
	  end

	describe "when email format is valid" do
	    it "should be valid" do
	      addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
	      addresses.each do |valid_address|
	        @rsvp.email = valid_address
	        expect(@rsvp).to be_valid
	      end
	    end
	  end

end