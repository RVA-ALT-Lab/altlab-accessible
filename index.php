<?php
/**
 * Plugin Name: ALT Lab Accessible Additions
 * Plugin URI: https://altlab.vcu.edu
 * Description: This plugin adds a button in the footer that creates a link to a text only view of the page and adds a skip to link in most themes
 * Version: .007	
 * Author: Tom Woodward
 * Author URI: http://bionicteaching.com
 * License: GPL2
 */
 
function altlab_textonly_enqueue_scripts() {
    wp_enqueue_style( 'altlab-textonly-styles', plugins_url( '/css/text-only-style.css', __FILE__ )  ); 
    wp_enqueue_script( 'altlab-textonly-scripts', plugins_url('/js/text-only.js', __FILE__), array( 'jquery' ), '1.0',true );

}
add_action( 'wp_enqueue_scripts', 'altlab_textonly_enqueue_scripts' );

function textonly_button_maker() {
    echo '<div class="text-only"><button id="text-only-view">Text Version</button></div>';
}
add_action( 'wp_footer', 'textonly_button_maker' );