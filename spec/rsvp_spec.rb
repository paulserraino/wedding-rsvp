require 'spec_helper'
require File.join(File.dirname(__FILE__), "../models/rsvp.rb")

describe RSVP do
	before { @rsvp = RSVP.new(first_name: "paul", last_name: "joe", email: "paul@test.com")}	

	subject { @rsvp }

	it { should respond_to(:first_name) }
	it { should respond_to(:last_name) }
	it { should respond_to(:email) }
	it { should respond_to(:created_at) }
	it { should respond_to(:updated_at) }
end