<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           Plugin_Name
 *
 * @wordpress-plugin
 * Plugin Name:       Linnya Network Live Chat
 * Plugin URI:        http://example.com/linnya-chat-uri/
 * Description:       Get started in less than 5 minutes! Linnya Network Live Chat allows you to talk to visitors in real-time from your smartphone, wherever you are! Carefully made on Google's Material Design guidelines and covered by Firebase's technologies. Highly recommended for E-commerces, Websites, and Blogs!                            
 * Version:           0.1.0
 * Author:            Linnya Technology, INC.
 * Author URI:        http://linnya.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       linnya-chat
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-linnya-chat-activator.php
 */
function activate_plugin_name() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-linnya-chat-activator.php';
	Plugin_Name_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-linnya-chat-deactivator.php
 */
function deactivate_plugin_name() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-linnya-chat-deactivator.php';
	Plugin_Name_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_plugin_name' );
register_deactivation_hook( __FILE__, 'deactivate_plugin_name' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-linnya-chat.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_plugin_name() {

	$plugin = new Plugin_Name();
	$plugin->run();

}
run_plugin_name();


// function wpb_widgets_init() {

// register_sidebar( array(
//     'name' => __( 'Linnya Chat', 'wpb' ),
//     'id' => 'linnya-chat',
//     'description' => __( 'The main sidebar appears on the right on each page except the front page template', 'wpb' ),
//     'before_widget' => '<aside id="%1$s" class="widget %2$s">',
//     'after_widget' => '</aside>',
//     'before_title' => '<h3 class="widget-title">',
//     'after_title' => '</h3>',
// ) );

// }
// add_action( 'widgets_init', 'wpb_widgets_init' );