<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Plugin_Name
 * @subpackage Plugin_Name/public
 * @author     Your Name <email@example.com>
 */
class Plugin_Name_Public {

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	public function enqueue_styles() {

 		wp_register_style('css', plugins_url('css/linnya-app.css', __FILE__ ));
		wp_enqueue_style('css');

		wp_register_style('roboto', plugins_url('css/roboto.css', __FILE__ ));
		wp_enqueue_style('roboto');

	}

	public function enqueue_scripts() {

		wp_register_script('angular', plugins_url('js/angularDebug.js', __FILE__ ));
		wp_enqueue_script('angular');

		wp_register_script('firebase', plugins_url('../admin/js/firebase.js', __FILE__ ));
		wp_enqueue_script('firebase');

		wp_register_script('sanitize', plugins_url('js/angular-sanitize.min.js', __FILE__ ));
		wp_enqueue_script('sanitize');

		wp_register_script('app', plugins_url('js/linnya-app.js', __FILE__ ));
		wp_enqueue_script('app');

		wp_register_script('modules', plugins_url('js/compressed.js', __FILE__ ));
		wp_enqueue_script('modules');

	}

}
