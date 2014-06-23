class Admin < ActiveRecord::Base
	validates :username, presence: true
	validates :password, presence: true

	def self.authenticate(username, password)
	end
end