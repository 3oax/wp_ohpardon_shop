<?php 
  $themeConfig = oax_get_theme_config_json(); 
?>
<style>
  .c-preloader {
    display: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 2147483646;
    overflow: hidden;
  }

  .c-preloader .c-page-transition {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483645;
    opacity: 1;
    visibility: visible;
    transform: translate(0, 0);
    will-change: transform opacity;
 }

 .c-preloader .c-page-transition__bg {
    background-color: var(--color__green);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
 } 
  
  .js .c-preloader {
    display: block;
  }

  .c-preloader__inner,
  .c-preloader__bg {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(0);
    transform-origin: 50% 50%;
  }

  #c-preloader__bar { }

  .c-preloader__bg {
    background-color: white;
  }

  .c-preloader__inner-svg {
    position: absolute;
    overflow: hidden;
    left: 50%;
    transform-origin: 50% 50%;
    top: 50%;
    opacity: 1;
    width: 150px;
    margin-left: -75px;
    margin-top: -75px;
    will-change: opacity, transform;
    animation: a-preloader-blink 2.8s infinite cubic-bezier(.55,0,.1,1);
    -webkit-animation: a-preloader-blink 2.8s infinite cubic-bezier(.55,0,.1,1);
  }
  
  .c-preloader__inner-svg svg { 
    width: 100%; height: 100%;   
  }
  .c-preloader__inner-svg svg path[fill="#FFFFFF"] {
    fill: <?= $themeConfig['colors']['blue']; ?>;
  }  
  .c-preloader__inner-svg svg path[stroke="#FFFFFF"] {
    stroke: <?= $themeConfig['colors']['blue']; ?>;
  }
  
  @media (min-width: 992px){
	  .c-preloader__inner-svg {
	    width: 250px;
	    margin-left: -125px;
	  }
  }

  @keyframes a-preloader-blink {
    0% { opacity: 1.0; transform: scale(1); }
    25% { opacity: 0; transform: scale(1.02); }
    50% { opacity: 1.0; transform: scale(1); }
    75% { opacity: 0; transform: scale(1.05); }        
    100% { opacity: 1.0; transform: scale(1); }
  }
  @-webkit-keyframes a-preloader-blink {
    0% { opacity: 1.0; -webkit-transform: scale(1); }
    25% { opacity: 0; -webkit-transform: scale(1.02); }
    50% { opacity: 1.0; -webkit-transform: scale(1); }
    75% { opacity: 0; -webkit-transform: scale(1.05); }        
    100% { opacity: 1.0; -webkit-transform: scale(1); }
  }

  #c-preloader__bar {
    position: fixed;
    width: 50%;
    left: 25%;
    top: 70%;
    z-index: 2147483647;
  }
  @media (min-width: 992px){
	  #c-preloader__bar {
	    top: 80%;		  
	  }
  }
  #c-preloader__bar .bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 5px;
    transition: height .3s ease, width .2s ease;
    width: 0;
    background-color: <?= $themeConfig['colors']['blue']; ?>;
  }
</style>