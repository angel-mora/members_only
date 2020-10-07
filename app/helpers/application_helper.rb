module ApplicationHelper
<<<<<<< HEAD
  def user_is_online(_user)
    link = if user_signed_in?
             " #{link_to 'Logout', destroy_user_session_path, method: :delete, class: 'head'}"

           else
             (link_to 'Login', new_user_session_path, class: 'head').to_s
           end

    link.html_safe
  end

=======
>>>>>>> d8cb38a7a135879cfccb0807006892f1585daf6a
  private

  def post_params
    params.require(:user).permit(:username, :name)
  end
end
