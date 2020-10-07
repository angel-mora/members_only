module ApplicationHelper

   def user_is_online(user)
     if user_signed_in?  
      link = " #{link_to "Logout",  destroy_user_session_path, method: :delete, class: "head"}"
    
     else
        link ="#{link_to "Login",  new_user_session_path, class: "head"}"
      end 

      link.html_safe
   end

  private
  def post_params
    params.require(:user).permit(:username, :name)
  end
end
