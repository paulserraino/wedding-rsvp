require 'pony'
class RSVPMailer

	def send(options = {})
		Pony.mail(
		  :to => 'pserraino99@gmail.com', 
		  :from => 'pserraino99@gmail.com', 
		  :subject => options[:subject], 
		  :body => options[:body],
		  :html_body => options[:html_body],
		  :via => :smtp,
		  :via_options => {
		    :address              => 'smtp.gmail.com',
		    :port                 => '587',
		    :enable_starttls_auto => true,
		    :user_name            => 'pserraino99@gmail.com',
		    :password             => 'ochemistry',
		    :authentication       => :plain, # :plain, :login, :cram_md5, no auth by default
		    :domain               => "localhost.localdomain" # the HELO domain provided by the client to the server
		})
	end
end