require "base64"
require 'uri'
require 'cgi'

module Jekyll
  class YouTubeTag < Liquid::Tag
    def initialize(tag_name, video_url, tokens)
      super
      query = URI::parse(video_url).query
      params = CGI::parse(query)
      @vid = params["v"][0]
    end

    def render(context)
      %|<iframe width="560" height="315" src="http://www.youtube.com/embed/#{@vid}" frameborder="0" allowfullscreen></iframe>|
    end
  end
end

Liquid::Template.register_tag('youtube', Jekyll::YouTubeTag)


module Jekyll
	class BaseDecode < Liquid::Tag
		def initialize(tag_name, text, tokens)
		super
		texto = Base64.encode64(text)
		@text = texto
		@txt = Base64.decode64(@text)
		end
		
		def render(context)
		"#{@text} //  #{@txt}"
		end
	end
end

Liquid::Template.register_tag('decode', Jekyll::BaseDecode)