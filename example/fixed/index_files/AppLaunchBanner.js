

/**
 * AppLaunchBanner
 * @constructor
 * @desc   Creates the AppLaunchBanner, which is a Smart Banner like part of the
 *         DOM, presenting you an option to download the Meetup app.
 *         Relies on these cookies:
 *         - app_installed: whether the app is installed for this user
 *         - appbanner_accepted: whether the appbar has been accepted previously
 * @param  {HTMLElement} [appBarElement] - optional argument for a
 *         particular element being assigned to being the appBar.
 * @returns {Boolean} whether or not the banner el is successfully initialized (null if hasnt yet)
 */

;(function () {

	

	// mk - this is a hacky way to support async loading on foundation and mweb pages
	// on mweb, basic is loaded, but not necessarily mu

	require(['onloader'], function (onloader) {
		onloader.onMuLoaded.add(function () {
			require(['jquery', 'core/cookie', 'core/browser', 'core/url'], AppLaunchBanner);
		});
	});

	function AppLaunchBanner($, Cookie, Browser, Url) {
		var COOKIE_NAME = 'appbanner_accepted',
		    DISPLAY_NONE = 'display--none',
		    $bannerEl;

		/**
   * @function init
   * @desc  Responsible for cookie checking, and determining whether to
   *        hide or show the banner element by default. Through CSS,
   *        this element should probably be hidden by default.
   *        Attaches event handlers to el for clicks, and calls accept()
   *        or dismiss()
   * @returns {Boolean} true on success, false on failure.
   */
		function init() {
			$bannerEl = $('#appLaunchBanner');

			var cookie = getAppLaunchBannerCookie(),
			    $openAppEl = $('#app-open'),
			    $installAppEl = $('#app-install');

			// initialize cookie if needed
			if (!cookie || typeof cookie.dismissed === 'undefined') {
				setAppLaunchBannerCookie({ 'dismissed': 0, 'shown': 1 });
				cookie = getAppLaunchBannerCookie();
			}

			// Fast Fallout under several cases:
			//  - Banner element isn't in the page
			//  - Cookie is undefined, for some reason
			//  - They have dismissed the app banner
			if (!$bannerEl || typeof cookie === 'undefined' || cookie.dismissed == 1) {
				return false;
			}
			$('#appLaunchBanner-dismiss').on('click', dismiss);

			return true;
		}

		/**
   * @function setAppLaunchBannerCookie
   * @param    cookie value
   * @desc     set or update the app banner dismissal cookie
   */
		function setAppLaunchBannerCookie(value) {
			Cookie.setCookie(COOKIE_NAME, Url.toUrlEncodedString(value), 14, // max cookie age in days
			null, // cookie path
			null, // cookie domain
			null, // secure cookie
			true // escape cookie
			);
		}

		/**
   * @function getAppLaunchBannerCookie
   * @desc     get the app banner dismissal cookie
   * @returns {Object} cookie object or undefined
   */
		function getAppLaunchBannerCookie() {
			var value = Cookie.getCookie(COOKIE_NAME);
			return value ? Url.getUrlVars(value) : undefined;
		}

		/**
   * @function dismiss
   * @param    Event e the click event - optional
   * @desc     hides the AppLaunchBanner and sets a cookie.
   */
		function dismiss(e) {
			e.preventDefault();
			setAppLaunchBannerCookie({ 'dismissed': 1, 'shown': 1 });
			$bannerEl.addClass(DISPLAY_NONE);
		}

		$(init());
	}
})();

define("site/microtarget/AppLaunchBanner", function(){});

