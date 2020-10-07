module PostsHelper
    def display_errors(post)
       show_error = '' 
       if post.errors.any?  

          post.errors.full_messages.each do |message|  
            show_error += "#{message}. "
          end  
        
       end  
       return "#{show_error}"
    end

    def display_name(post)
        post.user.name if user_signed_in?  
    end

    def show_controls_if_poster(user, post)
        if post.user == current_user 
          link_to 'Edit', edit_post_path(post) 
          link_to 'Destroy', post, method: :delete, data: { confirm: 'Are you sure?' } 
        end 
    end
end

