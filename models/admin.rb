class Admin < ActiveRecord::Base
	validates :username, presence: true
	validates :password, presence: true
end