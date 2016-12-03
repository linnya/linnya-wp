<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/admin
 * @author     Your Name <email@example.com>
 */
class Plugin_Name_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		wp_register_style('materialize', plugin_dir_url( __FILE__ ) . 'css/materialize.min.css');
		wp_register_style('app', plugin_dir_url( __FILE__ ) . 'css/app.css');


		wp_enqueue_style('materialize');
		wp_enqueue_style('app');

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		wp_register_script('firebase', plugin_dir_url( __FILE__ ) . 'js/firebase.js');
		wp_register_script('materialize', plugin_dir_url( __FILE__ ) . 'js/materialize.min.js');
		wp_register_script('app', plugin_dir_url( __FILE__ ) . 'js/app.js');

		wp_enqueue_script('firebase');
		wp_enqueue_script('materialize');
		wp_enqueue_script('app');

	}

}

add_action('admin_menu', 'plugin_setup_menu');

function plugin_setup_menu(){
	$existing = get_option("linnya-id");
	if($existing) add_menu_page( 'Tutorial', 'Linnya Chat', 'manage_options', 'linnya-chat-tutorial', 'tutorial');
	if(!$existing) add_menu_page( 'Signin', 'Linnya Chat', 'manage_options', 'linnya-chat-signin', 'signin');
    
    add_submenu_page(null, 'Signup', 'Signup', 'manage_options', 'linnya-chat-signup', 'signup' );
    add_submenu_page(null, 'Database', 'Database', 'manage_options', 'linnya-chat-database', 'database' );
}

function signin(){
    require_once 'partials/signin.php';
}
function signup(){
    require_once 'partials/signup.php';
}
function database(){
    require_once 'partials/database.php';
}
function tutorial(){
    require_once 'partials/tutorial.php';
}

class linnyaChatWidget extends WP_Widget {
 
  public function __construct() {
      $widget_ops = array(
      		'classname' => 'linnyaChatWidget', 
      		'description' => 'Linnya Chat widget BLA BLA BLA BLA');
      $this->WP_Widget('linnyaChatWidget', 'Linnya Chat Widget', $widget_ops);
  }
 
  function widget($args, $instance) {
	$accid = get_option("linnya-id");
    
    // Before widget code, if any
    echo "<script type='text/javascript'>";
    echo "var div = document.createElement('linnya'); \n";
    echo "div.setAttribute('accid', '".$accid."'); \n";
  	echo "document.body.appendChild(div); \n";
    echo '</script>';
  }

 
}
 
add_action( 'widgets_init', create_function('', 'return register_widget("linnyaChatWidget");') );
