module PostsHelper
  def display_errors(post)
    show_error = ''
    if post.errors.any?

      post.errors.full_messages.each do |message|
        show_error += "#{message}. "
      end

    end
    show_error.to_s
  end

  def display_name(post)
    post.user.name if user_signed_in?
  end

  def show_controls_if_poster(_user, post)
    return unless post.user == current_user

    link_to 'Edit', edit_post_path(post)
    link_to 'Destroy', post, method: :delete, data: { confirm: 'Are you sure?' }
  end
end